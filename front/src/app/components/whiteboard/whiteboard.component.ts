import {
    BroadcastDrawEvents, CollaborativeWhiteboardService, DrawEvent, DrawOptions, getClearEvent, getDefaultDrawOptions
} from 'projects/collaborative-whiteboard/src/public-api';
import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
  providers: [CollaborativeWhiteboardService]
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  drawOptions: DrawOptions = {
    strokeStyle: 'grey',
    lineWidth: 3
  };

  historyCut: {
    offset: number;
    events: DrawEvent[];
  };

  cutIndex = 0;

  cutLastIndex = 0;

  cutOpen = false;

  subscription: Subscription;

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {
    this.subscription = this.service.historyCut$.subscribe(historyCut => {
      this.historyCut = historyCut;
      this.cutLastIndex = Math.max(0, historyCut.events.length - 1);

      if (this.cutIndex > this.cutLastIndex) {
        this.cutIndex = this.cutLastIndex;
        this.service.cutRange(this.cutIndex);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
    if (this.cutOpen) {
      this.cutIndex = this.cutLastIndex;
      this.service.cutRange(this.cutIndex);
    }
  }

  updatecutIndex() {
    this.service.cutRange(this.cutIndex);
  }

  cut() {
    this.service.cut(this.historyCut.offset + this.cutIndex);
  }
}
