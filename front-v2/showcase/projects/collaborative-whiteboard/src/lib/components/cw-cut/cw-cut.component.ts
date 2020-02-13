import { combineLatest, Subscription } from 'rxjs';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { CutRange } from '../../cw.model';
import { CwService } from '../../cw.service';

@Component({
  selector: 'cw-cut',
  templateUrl: './cw-cut.component.html',
  styleUrls: ['./cw-cut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CwCutComponent implements OnInit, OnDestroy {
  cutLastPosition = 1;

  cutPosition = 1;

  cutSpread = 1;

  get cutRange(): CutRange {
    const from = this.cutPosition - 1;
    const to = from + this.cutSpread - 1;
    return [from, to];
  }

  private subscription: Subscription;

  constructor(
    private service: CwService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscribeToCutLength();
  }

  ngOnDestroy() {
    this.unsubscribeFromCutLength();
  }

  private subscribeToCutLength() {
    this.subscription = combineLatest([
      this.service.historyCutLength$,
      this.service.cutRange$,
    ]).subscribe(([cutLength, [from, to]]) => {
      this.cutLastPosition = Math.max(1, cutLength);
      this.cutPosition = from + 1;
      this.cutSpread = to - from + 1;

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
