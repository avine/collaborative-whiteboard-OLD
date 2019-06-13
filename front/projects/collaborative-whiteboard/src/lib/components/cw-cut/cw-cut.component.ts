import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { CwService } from '../../cw.service';

@Component({
  selector: 'cw-cut',
  templateUrl: './cw-cut.component.html',
  styleUrls: ['./cw-cut.component.scss']
})
export class CwCutComponent implements OnInit, OnDestroy {

  cutIndex = 0;

  private subscription: Subscription;

  constructor(public service: CwService) { }

  ngOnInit() {
    this.subscription = this.service.cutRange$.subscribe(([from, to]) => {
      this.cutIndex = from;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateCutIndex() {
    this.service.cutRange(this.cutIndex);
  }

  cut() {
    this.service.cutByRange([this.cutIndex, this.cutIndex]);
  }
}
