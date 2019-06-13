import { Subscription } from 'rxjs';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DrawOptions, DrawTransport, Owner } from '../../cw.model';
import { CwService } from '../../cw.service';
import { ToolType } from '../cw-tools/cw-tools.model';

@Component({
  selector: 'cw-whiteboard',
  templateUrl: './cw-whiteboard.component.html',
  styleUrls: ['./cw-whiteboard.component.scss'],
  providers: [CwService]
})
export class CwWhiteboardComponent implements OnInit, OnDestroy {

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

  cutOpen = false;

  subscription: Subscription;

  constructor(public service: CwService) { }

  ngOnInit() {
    this.subscription = this.service.emit$.subscribe((transport: DrawTransport) => {
      this.emit.emit(transport);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleToolType(type: ToolType) {
    switch (type) {
      case 'undo': this.service.undo(); break;
      case 'redo': this.service.redo(); break;
      case 'redraw': this.service.redraw(); break;
      case 'undoAll': this.service.undoAll(); break;
    }

    if (type === 'cut' && !this.cutOpen || this.cutOpen) {
      this.toggleCut();
    }
  }

  toggleCut() {
    this.cutOpen = !this.cutOpen;
  }
}
