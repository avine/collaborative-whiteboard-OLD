import { Subscription } from 'rxjs';

import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';

import { CutRange } from '../../cw.model';
import { CwService } from '../../cw.service';

@Component({
  selector: 'cw-cut',
  templateUrl: './cw-cut.component.html',
  styleUrls: ['./cw-cut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwCutComponent implements OnInit, OnDestroy {

  cutLastIndex = 0;

  cutIndex = 0;

  cutMaxSpread = 1;

  cutSpread = 1;

  get cutRange(): CutRange {
    return [this.cutIndex, this.cutIndex + this.cutSpread - 1];
  }

  private subscription: Subscription;

  constructor(
    private service: CwService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.updateCutRange();
    this.subscribeToCutLength();
  }

  ngOnDestroy() {
    this.unsubscribeFromCutLength();
  }

  private subscribeToCutLength() {
    this.subscription = this.service.historyCutLength$.subscribe(cutLength => {
      this.cutLastIndex =  Math.max(0, cutLength - 1);
      this.cutMaxSpread =  Math.max(1, cutLength);

      this.cutIndex = Math.min(this.cutIndex, this.cutLastIndex);
      this.cutSpread = Math.min(this.cutSpread, this.cutMaxSpread);

      this.changeDetectorRef.detectChanges();
    });
  }

  private unsubscribeFromCutLength() {
    this.subscription.unsubscribe();
  }

  updateCutRange() {
    this.service.setCutRange(this.cutRange);
  }

  cut() {
    this.service.cutByRange(this.cutRange);
  }
}
