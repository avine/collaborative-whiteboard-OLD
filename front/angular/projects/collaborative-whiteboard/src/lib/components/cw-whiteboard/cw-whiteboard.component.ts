import { Subscription } from 'rxjs';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DrawEventsBroadcast, DrawTransport, Owner } from '../../cw.model';
import { getDefaultCanvasSize, getDefaultDrawOptions } from '../../cw.operator';
import { CwService } from '../../cw.service';

@Component({
  selector: 'cw-whiteboard',
  templateUrl: './cw-whiteboard.component.html',
  styleUrls: ['./cw-whiteboard.component.scss'],
  providers: [CwService],
})
export class CwWhiteboardComponent implements OnInit, OnDestroy {
  @Input() fitParentElement = true;

  @Input() dragBoundarySelector: string;

  @Input() set onwer(owner: Owner) {
    this.service.owner = owner;
  }

  @Input() set broadcast(transport: DrawTransport) {
    this.service.broadcast(transport);
  }

  @Output() emit = new EventEmitter<DrawTransport>();

  @ViewChild('canvasContainer', { static: true, read: ElementRef })
  canvasContainer: ElementRef;

  canvasSize = getDefaultCanvasSize();

  drawOptions = getDefaultDrawOptions();

  showDrawLineTool = false;

  showCutTool = false;

  showGuides = true;

  broadcastHistoryCut: DrawEventsBroadcast;

  subscriptions: Subscription[] = [];

  constructor(public service: CwService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.service.emit$.subscribe((transport: DrawTransport) => {
        this.emit.emit(transport);
      }),
      // This is tricky!
      // We can't subscribe to `broadcastHistoryCut$` in the template like this:
      //
      //  <cw-canvas
      //    *ngIf="showCutTool"
      //    [broadcast]="broadcastHistoryCut$ | async"
      //  ></cw-canvas>
      //
      // Because this canvas is rendered conditionally, the following error was thrown:
      // "ExpressionChangedAfterItHasBeenCheckedError"
      //
      // In other words, we need the data emitted by `broadcastHistoryCut$`to be ready eagerly.
      this.service.broadcastHistoryCut$.subscribe(broadcastHistoryCut => {
        this.broadcastHistoryCut = broadcastHistoryCut;
      }),
    );

    if (this.fitParentElement) {
      this.fitCanvasSizeToParentElement();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private fitCanvasSizeToParentElement() {
    const element = this.canvasContainer.nativeElement as HTMLElement;
    // Fit the container
    element.style.width = '100%';
    element.style.height = '100%';
    // Freeze both container and canvas sizes
    const { width, height } = element.getBoundingClientRect();
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    this.canvasSize = { width, height };
  }
}
