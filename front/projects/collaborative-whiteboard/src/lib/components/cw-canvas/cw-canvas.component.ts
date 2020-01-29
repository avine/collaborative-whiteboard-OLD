import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  BroadcastDrawEvents,
  CanvasLine,
  CanvasLineSerie,
  CanvasPoint,
  CanvasSize,
  DrawEvent,
  DrawOptions,
} from '../../cw.model';
import {
  getClearEvent,
  getDefaultCanvasSize,
  getDefaultDrawOptions,
  keepDrawEventsAfterClearEvent,
} from '../../cw.operator';

type CanvasEvent = MouseEvent | TouchEvent;

@Component({
  selector: 'cw-canvas',
  templateUrl: './cw-canvas.component.html',
  styleUrls: ['./cw-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CwCanvasComponent implements AfterViewInit, OnChanges {
  @Input() canvasSize = getDefaultCanvasSize();

  @Output() canvasSizeChange = new EventEmitter<CanvasSize>();

  @Input() showGuides = true;

  @Input() broadcast: BroadcastDrawEvents;

  @Input() drawOptions = getDefaultDrawOptions();

  @Input() drawDisabled = false;

  @Output() draw = new EventEmitter<DrawEvent>();

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef<
    HTMLCanvasElement
  >;

  private context: CanvasRenderingContext2D;

  private broadcastId = 0;

  private broadcastBuffer: DrawEvent[] = [];

  private lineSerieBuffer: number[] = [];

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.initMousemoveListener();
    this.applyCanvasSize();
    this.initContext();
  }

  ngOnChanges({ canvasSize, broadcast }: SimpleChanges) {
    if (canvasSize && canvasSize.currentValue && !canvasSize.firstChange) {
      this.applyCanvasSize();
    }
    if (broadcast && broadcast.currentValue) {
      this.broadcastHandler();
    }
  }

  private initMousemoveListener() {
    // Prevent unnecessary changes detection
    this.ngZone.runOutsideAngular(() => {
      this.canvasRef.nativeElement.addEventListener(
        'touchmove',
        this.drawMove.bind(this),
      );
      this.canvasRef.nativeElement.addEventListener(
        'mousemove',
        this.drawMove.bind(this),
      );
    });
  }

  private applyCanvasSize() {
    this.canvasRef.nativeElement.width = this.canvasSize.width;
    this.canvasRef.nativeElement.height = this.canvasSize.height;
    if (this.context) {
      // Changing the canvas size will reset its context...
      this.setDefaultContext();
    }
    // Actually, the only way to change the value of `canvasSize` is when its @Input() changes.
    // And emitting the value we just received seems to be useless!
    // But we still need to do this, so that the wrapping component can react to this change asynchronously.
    this.canvasSizeChange.emit(this.canvasSize);
  }

  private initContext() {
    if (this.canvasRef.nativeElement.getContext) {
      this.context = this.canvasRef.nativeElement.getContext('2d');
      this.setDefaultContext();

      // This is tricky!
      // In the method `broadcastHandler` we need to call `flushBroadcastBuffer`.
      // But the method `flushBroadcastBuffer` requires the `context` to be defined.
      // This will not necessarily be the case!
      // For this reason, we check again here, at the time the `context` is well defined.
      if (this.broadcastBuffer.length) {
        this.flushBroadcastBuffer();
      }
    } else {
      console.error('Canvas NOT supported!');
    }
  }

  private broadcastHandler() {
    this.updateBroadcastBuffer();
    if (this.context) {
      // Note: the following method might be NOT called (if the `context` is not yet defined).
      // And this will occurs if there's a `broadcast` @Input at the time `ngOnInit` is fired.
      // For this reason, we flush the buffer again in the method `initContext`.
      this.flushBroadcastBuffer();
    }
  }

  private updateBroadcastBuffer() {
    const events = keepDrawEventsAfterClearEvent(this.broadcast.events);
    if (events.length < this.broadcast.events.length) {
      this.broadcastBuffer = [getClearEvent(), ...events];
    } else {
      this.broadcastBuffer.push(...this.broadcast.events);
    }
  }

  private flushBroadcastBuffer() {
    const id = ++this.broadcastId; // Do this on top (and NOT inside the `else` statement)
    if (!this.broadcast.animate || !window) {
      while (this.broadcastBuffer.length) {
        this.drawHandler(this.broadcastBuffer.shift());
      }
    } else {
      const steps = this.broadcastBuffer.length;
      const step = () => {
        if (id === this.broadcastId) {
          if (this.broadcastBuffer.length) {
            const count = this.flushCount(this.broadcastBuffer.length, steps);
            for (let i = 0; i < count; i++) {
              this.drawHandler(this.broadcastBuffer.shift());
            }
            window.requestAnimationFrame(step);
          } else {
            // Because we are using `ChangeDetectionStrategy.OnPush`, the end of the
            // animation (which occurs asynchronously) is NOT detected by Angular.
            // For this reason, we have to detect this change manually.
            this.changeDetectorRef.detectChanges();
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
        console.error('Unhandled event', event);
        break;
      }
    }
  }

  private setDefaultContext() {
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
  }

  private applyDrawOptions(options = this.drawOptions) {
    Object.assign(this.context, options);
  }

  private drawPoint([x, y]: CanvasPoint, options?: DrawOptions) {
    this.applyDrawOptions(options);
    this.context.beginPath();
    this.context.arc(x, y, 0, 0, Math.PI * 2);
    this.context.stroke();
    this.applyDrawOptions();
  }

  private drawLine(
    [fromX, fromY, toX, toY]: CanvasLine,
    options?: DrawOptions,
  ) {
    this.applyDrawOptions(options);
    this.context.beginPath();
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY);
    this.context.stroke();
    this.applyDrawOptions();
  }

  private drawLineSerie(serie: CanvasLineSerie, options?: DrawOptions) {
    this.applyDrawOptions(options);
    this.context.beginPath();
    this.context.moveTo(serie[0], serie[1]);
    this.context.lineTo(serie[2], serie[3]);
    for (let i = 4; i < serie.length; i = i + 2) {
      this.context.lineTo(serie[i], serie[i + 1]);
    }
    this.context.stroke();
    this.applyDrawOptions();
  }

  private drawClear([
    fromX = 0,
    fromY = 0,
    toX = this.canvasSize.width,
    toY = this.canvasSize.height,
  ]: CanvasLine) {
    this.context.clearRect(fromX, fromY, toX, toY);
  }

  private emit(event: DrawEvent) {
    this.draw.emit(event);
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
      top: canvasY,
    } = this.canvasRef.nativeElement.getBoundingClientRect();
    return this.canvasPointAdjustment([eventX - canvasX, eventY - canvasY]);
  }

  private canvasPointAdjustment(canvasPoint: CanvasPoint): CanvasPoint {
    if (this.drawOptions.lineWidth % 2 === 1) {
      return [canvasPoint[0] + 0.5, canvasPoint[1] + 0.5];
    }
    return canvasPoint;
  }

  drawStart(e: CanvasEvent) {
    const touchesLength = this.touchEventHandler(e); // Do this on top (NOT in the "if" statement)
    if (touchesLength > 1) {
      return; // Remember that only "single-touch" event is considered as draw event.
    }
    if (!this.drawDisabled) {
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
      const data = this.canvasPointAdjustment(this
        .lineSerieBuffer as CanvasPoint);
      this.drawPoint(data);
      this.emit({
        owner: null,
        type: 'point',
        options: this.drawOptions,
        data,
      });
    } else if (this.lineSerieBuffer.length > 2) {
      const data = this.lineSerieBuffer as CanvasLineSerie;
      this.emit({
        owner: null,
        type: 'lineSerie',
        options: this.drawOptions,
        data,
      });
    }
    this.lineSerieBuffer = [];
  }
}
