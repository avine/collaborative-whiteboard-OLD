import { Component, OnInit } from '@angular/core';
import {
  DrawEvent,
  DrawEventsBroadcast,
  drawEventsBroadcastMapper,
} from '@collaborative-whiteboard';

@Component({
  selector: 'app-canvas-mirror',
  templateUrl: './canvas-mirror.component.html',
  styleUrls: ['./canvas-mirror.component.scss'],
})
export class CanvasMirrorComponent implements OnInit {
  drawEventsBroadcast: DrawEventsBroadcast;

  animate = true;

  constructor() {}

  ngOnInit() {}

  broadcast(drawEvent: DrawEvent) {
    this.drawEventsBroadcast = drawEventsBroadcastMapper(
      [drawEvent],
      this.animate,
    );
  }
}
