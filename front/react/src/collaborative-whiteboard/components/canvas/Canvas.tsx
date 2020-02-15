/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, MouseEvent, TouchEvent } from 'react';
import {
  CanvasLine,
  CanvasLineSerie,
  CanvasPoint,
  CanvasSize,
  DrawEvent,
  DrawEventsBroadcast,
  DrawOptions
} from '../../models';
import {
  getClearEvent,
  getDefaultCanvasSize,
  getDefaultDrawOptions,
  keepDrawEventsAfterClearEvent
} from '../../operators';

type CanvasEvent = MouseEvent | TouchEvent;

export interface CanvasProps {
  className?: string;
  canvasSize?: CanvasSize;
  showGuides?: boolean;
  broadcast?: DrawEventsBroadcast;
  drawOptions?: DrawOptions;
  drawDisabled?: boolean;
  canvasSizeHandler?: (canvasSize: CanvasSize) => void;
  draw?: (drawEvent: DrawEvent) => void;
}

class Canvas extends React.Component<CanvasProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: CanvasProps = {
    canvasSize: getDefaultCanvasSize(),
    showGuides: true,
    drawOptions: getDefaultDrawOptions(),
    drawDisabled: false,
    canvasSizeHandler: () => {},
    draw: () => {}
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    canvasSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    showGuides: PropTypes.bool,
    drawOptions: PropTypes.shape({
      lineWidth: PropTypes.number,
      strokeStyle: PropTypes.string
    }),
    drawDisabled: PropTypes.bool,
    canvasSizeHandler: PropTypes.func,
    draw: PropTypes.func
  };

  private canvasRef = createRef<HTMLCanvasElement>();

  private canvasCtx: CanvasRenderingContext2D;

  private broadcastId = 0;

  private broadcastBuffer: DrawEvent[] = [];

  private lineSerieBuffer: number[] = [];

  private get className() {
    return classNames('cw-canvas', this.props.className, {
      'cw-canvas--guides': this.props.showGuides
    });
  }

  componentDidMount() {
    this.applyCanvasSize();
    this.initCanvasCxt();

    if (this.props.broadcast?.events?.length) {
      this.broadcastHandler();
    }
  }

  componentDidUpdate({ canvasSize, broadcast }: CanvasProps) {
    if (
      this.props.canvasSize.width !== canvasSize?.width ||
      this.props.canvasSize.height !== canvasSize?.height
    ) {
      this.applyCanvasSize();
    }
    if (
      this.props.broadcast?.events?.length &&
      this.props.broadcast !== broadcast
    ) {
      this.broadcastHandler();
    }
  }

  private applyCanvasSize() {
    this.canvasRef.current.width = this.props.canvasSize.width;
    this.canvasRef.current.height = this.props.canvasSize.height;
    if (this.canvasCtx) {
      // Changing the canvas size will reset its context...
      this.setDefaultCanvasCtx();
    }
    // Actually, the only way to change the value of `canvasSize` is when its @Input() changes.
    // And emitting the value we just received seems to be useless!
    // But we still need to do this, so that the wrapping component can react to this change asynchronously.
    this.props.canvasSizeHandler(this.props.canvasSize);
  }

  private initCanvasCxt() {
    if (this.canvasRef.current.getContext) {
      this.canvasCtx = this.canvasRef.current.getContext('2d');
      this.setDefaultCanvasCtx();
    } else {
      // eslint-disable-next-line no-console
      console.error('Canvas NOT supported!');
    }
  }

  private broadcastHandler() {
    this.updateBroadcastBuffer();
    this.flushBroadcastBuffer();
  }

  private updateBroadcastBuffer() {
    const events = keepDrawEventsAfterClearEvent(this.props.broadcast.events);
    if (events.length < this.props.broadcast.events.length) {
      this.broadcastBuffer = [getClearEvent(), ...events];
    } else {
      this.broadcastBuffer.push(...this.props.broadcast.events);
    }
  }

  private flushBroadcastBuffer() {
    this.broadcastId += 1;
    const id = this.broadcastId; // Do this on top (and NOT inside the `else` statement)
    if (!this.props.broadcast.animate || !window) {
      while (this.broadcastBuffer.length) {
        this.drawHandler(this.broadcastBuffer.shift());
      }
    } else {
      const steps = this.broadcastBuffer.length;
      const step = () => {
        if (id === this.broadcastId) {
          if (this.broadcastBuffer.length) {
            const count = this.flushCount(this.broadcastBuffer.length, steps);
            for (let i = 0; i < count; i += 1) {
              this.drawHandler(this.broadcastBuffer.shift());
            }
            window.requestAnimationFrame(step);
          } else {
            // Because we are using `ChangeDetectionStrategy.OnPush`, the end of the
            // animation (which occurs asynchronously) is NOT detected by Angular.
            // For this reason, we have to detect this change manually.
            /* this.changeDetectorRef.detectChanges(); */
            // FIXME...
          }
        }
      };
      window.requestAnimationFrame(step);
    }
  }

  private flushCount(remain: number, total: number) {
    // Let's do some easing!
    const count = Math.round(Math.sin((remain / total) * Math.PI) * 9) + 1;
    return Math.min(count, remain);
  }

  private drawHandler(event: DrawEvent) {
    switch (event.type) {
      case 'point': {
        this.drawPoint(event.data, event.options);
        break;
      }
      case 'line': {
        this.drawLine(event.data, event.options);
        break;
      }
      case 'lineSerie': {
        this.drawLineSerie(event.data, event.options);
        break;
      }
      case 'clear': {
        this.drawClear(event.data);
        break;
      }
      default: {
        // eslint-disable-next-line no-console
        console.error('Unhandled event', event);
        break;
      }
    }
  }

  private setDefaultCanvasCtx() {
    this.canvasCtx.lineCap = 'round';
    this.canvasCtx.lineJoin = 'round';
  }

  private applyDrawOptions(options = this.props.drawOptions) {
    Object.assign(this.canvasCtx, options);
  }

  private drawPoint([x, y]: CanvasPoint, options?: DrawOptions) {
    this.applyDrawOptions(options);
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(x, y, 0, 0, Math.PI * 2);
    this.canvasCtx.stroke();
    this.applyDrawOptions();
  }

  private drawLine(
    [fromX, fromY, toX, toY]: CanvasLine,
    options?: DrawOptions
  ) {
    this.applyDrawOptions(options);
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(fromX, fromY);
    this.canvasCtx.lineTo(toX, toY);
    this.canvasCtx.stroke();
    this.applyDrawOptions();
  }

  private drawLineSerie(serie: CanvasLineSerie, options?: DrawOptions) {
    this.applyDrawOptions(options);
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(serie[0], serie[1]);
    this.canvasCtx.lineTo(serie[2], serie[3]);
    for (let i = 4; i < serie.length; i += 2) {
      this.canvasCtx.lineTo(serie[i], serie[i + 1]);
    }
    this.canvasCtx.stroke();
    this.applyDrawOptions();
  }

  private drawClear([
    fromX = 0,
    fromY = 0,
    toX = this.props.canvasSize.width,
    toY = this.props.canvasSize.height
  ]: CanvasLine) {
    this.canvasCtx.clearRect(fromX, fromY, toX, toY);
  }

  /**
   * @returns The number of touches for touch event or 0 for mouse event
   */
  private touchEventHandler(e: CanvasEvent): number {
    const isTouchEvent =
      e.type === 'touchstart' ||
      e.type === 'touchmove' ||
      e.type === 'touchend';
    if (isTouchEvent) {
      const touchesLength = (e as TouchEvent).touches.length;
      if (touchesLength === 1) {
        // Prevent "mouse" event from being fired when "touch" event is detected.
        // Notice that only "single-touch" event is considered as draw event.
        e.preventDefault();
      }
      return touchesLength;
    }
    return 0;
  }

  private getCanvasPoint(e: CanvasEvent, touchesLength: number): CanvasPoint {
    const { clientX: eventX, clientY: eventY } =
      touchesLength === 1 ? (e as TouchEvent).touches[0] : (e as MouseEvent);
    const {
      left: canvasX,
      top: canvasY
    } = this.canvasRef.current.getBoundingClientRect();
    return this.canvasPointAdjustment([eventX - canvasX, eventY - canvasY]);
  }

  private canvasPointAdjustment(canvasPoint: CanvasPoint): CanvasPoint {
    if (this.props.drawOptions.lineWidth % 2 === 1) {
      return [canvasPoint[0] + 0.5, canvasPoint[1] + 0.5];
    }
    return canvasPoint;
  }

  drawStart(e: CanvasEvent) {
    const touchesLength = this.touchEventHandler(e); // Do this on top (NOT in the "if" statement)
    if (touchesLength > 1) {
      return; // Remember that only "single-touch" event is considered as draw event.
    }
    if (!this.props.drawDisabled) {
      this.lineSerieBuffer = this.getCanvasPoint(e, touchesLength);
    }
  }

  drawMove(e: CanvasEvent) {
    const touchesLength = this.touchEventHandler(e); // Do this on top (NOT in the "if" statement)
    if (this.lineSerieBuffer.length) {
      const fromX = this.lineSerieBuffer[this.lineSerieBuffer.length - 2];
      const fromY = this.lineSerieBuffer[this.lineSerieBuffer.length - 1];
      const [toX, toY] = this.getCanvasPoint(e, touchesLength);
      if (toX === fromX && toY === fromY) {
        return;
      }
      this.drawLine([fromX, fromY, toX, toY]);
      this.lineSerieBuffer.push(toX, toY);
    }
  }

  drawEnd(e: CanvasEvent) {
    this.touchEventHandler(e); // Do this on top (NOT in the "if" statement)
    if (this.lineSerieBuffer.length === 2) {
      const data = this.canvasPointAdjustment(
        this.lineSerieBuffer as CanvasPoint
      );
      this.drawPoint(data);
      this.props.draw({
        owner: null,
        type: 'point',
        options: this.props.drawOptions,
        data
      });
    } else if (this.lineSerieBuffer.length > 2) {
      const data = this.lineSerieBuffer as CanvasLineSerie;
      this.props.draw({
        owner: null,
        type: 'lineSerie',
        options: this.props.drawOptions,
        data
      });
    }
    this.lineSerieBuffer = [];
  }

  render() {
    return (
      <canvas
        className={this.className}
        ref={this.canvasRef}
        onTouchStart={this.drawStart.bind(this)}
        onTouchMove={this.drawMove.bind(this)}
        onTouchEnd={this.drawEnd.bind(this)}
        onMouseDown={this.drawStart.bind(this)}
        onMouseMove={this.drawMove.bind(this)}
        onMouseUp={this.drawEnd.bind(this)}
        onMouseLeave={this.drawEnd.bind(this)}
      />
    );
  }
}

export default Canvas;
