import { Subscription } from 'rxjs';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DrawEvent, DrawOptions, DrawTransport, Owner } from '../../collaborative-whiteboard.model';
import { CollaborativeWhiteboardService } from '../../collaborative-whiteboard.service';
import { ToolboxActionType } from '../toolbox/toolbox.model';

@Component({
  selector: 'cw-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
  providers: [CollaborativeWhiteboardService]
})
export class WhiteboardComponent implements OnInit, OnDestroy {
  @Input() set onwer(owner: Owner) {
    this.service.owner = owner;
  }

  @Input() set broadcast(transport: DrawTransport) {
    this.service.broadcast(transport);
  }

  @Output() emit = new EventEmitter<DrawTransport>();

  drawOptions: DrawOptions = {
    strokeStyle: 'grey',
    lineWidth: 6
  };

  historyCut: DrawEvent[];

  cutIndex = 0;

  cutLastIndex = 0;

  cutOpen = false;

  subscriptions: Subscription[] = [];

  constructor(public service: CollaborativeWhiteboardService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.service.historyCut$.subscribe(historyCut => {
        this.historyCut = historyCut;
        this.cutLastIndex = Math.max(0, historyCut.length - 1);

        if (this.cutIndex > this.cutLastIndex) {
          this.cutIndex = this.cutLastIndex;
          this.service.cutRange(this.cutIndex);
        }
      }),

      this.service.emit$.subscribe((transport: DrawTransport) => {
        this.emit.emit(transport);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleActionType(type: ToolboxActionType) {
    switch (type) {
      case 'undo': this.service.undo(); break;
      case 'redo': this.service.redo(); break;
      case 'redraw': this.service.redraw(); break;
      case 'undoAll': this.service.clear(); break;
    }

    if (type === 'cut' && !this.cutOpen || this.cutOpen) {
      this.toggleCut();
    }
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
    if (this.cutOpen) {
      this.cutIndex = this.cutLastIndex;
      this.service.cutRange(this.cutIndex);
    }
  }

  updateCutIndex() {
    this.service.cutRange(this.cutIndex);
  }

  cut() {
    const event = this.historyCut[this.cutIndex];
    if (event) {
      this.service.cut([event]);
    }
  }
}
