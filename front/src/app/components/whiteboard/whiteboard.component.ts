import {
    CollaborativeWhiteboardService, DrawEvent, BroadcastDrawEvents, getClearEvent
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
  history: DrawEvent[] = [];

  historyIndex = 0;

  slice: BroadcastDrawEvents;

  cutOpen = false;

  subscription: Subscription;

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {
    this.subscription = this.service.history$.subscribe(history => {
      this.history = history;
      this.updateSlice();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
    if (this.cutOpen) {
      this.updateSlice();
    } else {
      this.historyIndex = 0;
    }
  }

  updateSlice() {
    const slice = this.history.slice(this.historyIndex, this.historyIndex + 1);
    this.slice = {
      animate: false,
      events: [getClearEvent(), ...slice]
    };
  }

  cut() {
    this.service.cut(this.historyIndex);
    this.historyIndex = Math.min(
      this.historyIndex,
      this.history.length ? this.history.length - 1 : 0
    );
    this.updateSlice();
  }
}
