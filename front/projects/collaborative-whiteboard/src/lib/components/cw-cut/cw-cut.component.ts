import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { DrawEvent } from '../../cw.model';
import { CwService } from '../../cw.service';

@Component({
  selector: 'cw-cut',
  templateUrl: './cw-cut.component.html',
  styleUrls: ['./cw-cut.component.scss']
})
export class CwCutComponent implements OnInit, OnDestroy {

  cutIndex = 0;

  cutLastIndex = 0;

  private historyCut: DrawEvent[];

  private subscription: Subscription;

  constructor(public service: CwService) { }

  ngOnInit() {
    this.subscription = this.service.historyCut$.subscribe(historyCut => {
      this.historyCut = historyCut;
      this.cutLastIndex = Math.max(0, historyCut.length - 1);

      /*if (this.cutIndex > this.cutLastIndex) {
        this.cutIndex = this.cutLastIndex;
        this.service.cutRange(this.cutIndex);
      }*/

      if (this.cutIndex > this.cutLastIndex) {
        this.cutIndex = this.cutLastIndex;
      }
      this.service.cutRange(this.cutIndex); // = 0
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
