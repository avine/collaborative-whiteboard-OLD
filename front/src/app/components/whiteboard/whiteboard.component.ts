import {
    BroadcastDrawEvents, CollaborativeWhiteboardService, DrawEvent, getClearEvent
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

  historyIndex = 0;

  lastIndex = 0;

  cutOpen = false;

  subscription: Subscription;

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {
    this.subscription = this.service.historyLastIndex$.subscribe(lastIndex => {
      this.lastIndex = lastIndex;
      if (this.historyIndex > lastIndex) {
        this.service.historyRange(this.historyIndex = lastIndex);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
    if (this.cutOpen) {
      this.service.historyRange(this.historyIndex = this.lastIndex);
    }
  }

  updateSlice() {
    this.service.historyRange(this.historyIndex);
  }

  cut() {
    this.service.cut(this.historyIndex);
  }
}
