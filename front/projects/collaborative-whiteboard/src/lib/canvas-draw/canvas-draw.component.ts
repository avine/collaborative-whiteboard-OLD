import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CanvasSize, DrawOptions } from '../collaborative-whiteboard.model';
import { getDefaultCanvasSize, getDefaultDrawOptions } from '../collaborative-whiteboard.operator';
import { CollaborativeWhiteboardService } from '../collaborative-whiteboard.service';

@Component({
  selector: 'cw-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss']
})
export class CanvasDrawComponent implements OnInit {
  // Propagate binding
  @Input() canvasSize = getDefaultCanvasSize();
  @Output() canvasSizeChange = new EventEmitter<CanvasSize>();
  @Input() background = true;
  @Input() drawOptions: DrawOptions = getDefaultDrawOptions();
  @Input() drawDisabled = false;
  // Propagate binding

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {

  }
}
