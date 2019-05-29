import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { BroadcastDrawEvents } from '../collaborative-whiteboard.model';
import { mapDrawLineSerieToDrawLines } from '../collaborative-whiteboard.operator';
import { CollaborativeWhiteboardService } from '../collaborative-whiteboard.service';

@Component({
  selector: 'cw-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.css']
})
export class CanvasDrawComponent implements OnInit {

  // Just a demo
  broadcast$ = this.service.emit$.pipe(map(transport => {
    const broadcast: BroadcastDrawEvents = {
      animate: true,
      events: mapDrawLineSerieToDrawLines(transport.map(item => item.event))
    };
    return broadcast;
  }));

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {

  }
}
