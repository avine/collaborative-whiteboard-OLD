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

import { DrawTransport, Owner } from '../../cw.model';
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

  hideGuides = false;

  subscription: Subscription;

  constructor(public service: CwService) {}

  ngOnInit() {
    this.subscription = this.service.emit$.subscribe(
      (transport: DrawTransport) => {
        this.emit.emit(transport);
      },
    );

    if (this.fitParentElement) {
      this.fitCanvasSizeToParentElement();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
