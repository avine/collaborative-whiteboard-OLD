import {
    BroadcastDrawEvents, broadcastDrawEventsMapper, DrawEvent
} from 'projects/collaborative-whiteboard/src/public-api';

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
    this.broadcastDrawEvents = broadcastDrawEventsMapper([drawEvent], this.animate);
  }
}
