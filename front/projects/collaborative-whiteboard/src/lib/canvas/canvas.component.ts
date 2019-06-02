import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter,
    Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';

import {
    BroadcastDrawEvents, CanvasLine, CanvasLineSerie, CanvasPoint, CanvasSize, DrawEvent,
    DrawOptions
} from '../collaborative-whiteboard.model';
import {
    getClearEvent, getDefaultCanvasSize, getDefaultDrawOptions, keepDrawEventsAfterClearEvent
} from '../collaborative-whiteboard.operator';

type ComponentInputType =
  | 'canvasSize'
  | 'broadcast';

@Component({
  selector: 'cw-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @Input() canvasSize = getDefaultCanvasSize();

  @Output() canvasSizeChange = new EventEmitter<CanvasSize>();

  @Input() showGuides = true;

  @Input() broadcast: BroadcastDrawEvents;

  @Input() drawOptions: DrawOptions = getDefaultDrawOptions();

  @Input() drawDisabled = false;

  @Output() draw = new EventEmitter<DrawEvent>();

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D;

  private broadcastId = 0;

  private broadcastBuffer: DrawEvent[] = [];

  private lineSerieBuffer: number[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.applyCanvasSize();
    this.initContext();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.getCurrentValue(changes, 'canvasSize')) {
      this.applyCanvasSize();
    }
    if (this.getCurrentValue(changes, 'broadcast')) {
      this.broadcastHandler();
    }
  }

  private getCurrentValue(changes: SimpleChanges, input: ComponentInputType) {
    return changes[input] && changes[input].currentValue;
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
    return Math.round(Math.sin((remain / total) * Math.PI) * 10 + 1);
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

  private drawLine([fromX, fromY, toX, toY]: CanvasLine, options?: DrawOptions) {
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

  private drawClear([fromX = 0, fromY = 0, toX = this.canvasSize.width, toY = this.canvasSize.height]: CanvasLine) {
    this.context.clearRect(fromX, fromY, toX, toY);
  }

  private emit(event: DrawEvent) {
    this.draw.emit(event);
  }

  mousedown(e: MouseEvent) {
    if (!this.drawDisabled) {
      this.lineSerieBuffer = [e.offsetX, e.offsetY];
    }
  }

  mousemove(e: MouseEvent) {
    if (this.lineSerieBuffer.length) {
      const fromX = this.lineSerieBuffer[this.lineSerieBuffer.length - 2];
      const fromY = this.lineSerieBuffer[this.lineSerieBuffer.length - 1];
      const toX = e.offsetX;
      const toY = e.offsetY;
      this.drawLine([fromX, fromY, toX, toY]);
      this.lineSerieBuffer.push(toX, toY);
    }
  }

  mouseup() {
    if (this.lineSerieBuffer.length === 2) {
      const data = this.lineSerieBuffer as CanvasPoint;
      this.drawPoint(data);
      this.emit({ user: null, type: 'point', options: this.drawOptions, data });
    } else {
      const data = this.lineSerieBuffer as CanvasLineSerie;
      this.emit({ user: null, type: 'lineSerie', options: this.drawOptions, data });
    }
    this.lineSerieBuffer = [];
  }
}
