import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CwService,
  DrawEvent,
  DrawOptions,
  DrawTransport,
} from '@collaborative-whiteboard';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  providers: [CwService],
})
export class DemoComponent implements OnInit, OnDestroy {
  drawOptions: DrawOptions = {
    strokeStyle: 'grey',
    lineWidth: 4,
  };

  historyCut: DrawEvent[];

  cutIndex = 0;

  cutLastIndex = 0;

  cutOpen = false;

  subscriptions: Subscription[] = [];

  constructor(
    private socketService: SocketService,
    public service: CwService,
  ) {}

  ngOnInit() {
    this.socketService.socket.on(
      'broadcastDrawTransport',
      (transport: DrawTransport) => {
        this.service.broadcast(transport);
      },
    );

    this.subscriptions.push(
      this.service.historyCut$.subscribe(historyCut => {
        this.historyCut = historyCut;
        this.cutLastIndex = Math.max(0, historyCut.length - 1);

        if (this.cutIndex > this.cutLastIndex) {
          this.cutIndex = this.cutLastIndex;
          this.service.setCutRange(this.cutIndex);
        }
      }),

      this.service.emit$.subscribe((transport: DrawTransport) => {
        this.socketService.socket.emit('drawTransport', transport);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
    if (this.cutOpen) {
      this.cutIndex = this.cutLastIndex;
      this.service.setCutRange(this.cutIndex);
    }
  }

  updateCutIndex() {
    this.service.setCutRange(this.cutIndex);
  }

  cut() {
    const event = this.historyCut[this.cutIndex];
    if (event) {
      this.service.cut([event]);
    }
  }
}
