import { DrawEvent, BroadcastDrawEvents, mapDrawLineSerieToDrawLines } from 'projects/collaborative-whiteboard/src/public-api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas-mirror',
  templateUrl: './canvas-mirror.component.html',
  styleUrls: ['./canvas-mirror.component.scss']
})
export class CanvasMirrorComponent implements OnInit {
  broadcastDrawEvents: BroadcastDrawEvents;

  animate = true;

  constructor() { }

  ngOnInit() {
  }

  broadcast(drawEvent: DrawEvent) {
    if (this.animate) {
      this.broadcastDrawEvents = { animate: true, events: mapDrawLineSerieToDrawLines([drawEvent]) };
    } else {
      this.broadcastDrawEvents = { animate: false, events: [drawEvent] };
    }
  }
}
