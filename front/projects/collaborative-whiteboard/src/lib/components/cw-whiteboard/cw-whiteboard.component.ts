import { Subscription } from 'rxjs';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DrawTransport, Owner } from '../../cw.model';
import { getDefaultDrawOptions } from '../../cw.operator';
import { CwService } from '../../cw.service';

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

  drawOptions = getDefaultDrawOptions();

  showDrawLineTool = false;

  showCutTool = false;

  hideGuides = false;

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
}
