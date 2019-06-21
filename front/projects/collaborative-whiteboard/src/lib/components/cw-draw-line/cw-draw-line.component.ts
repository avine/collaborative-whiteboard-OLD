import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DrawOptions } from '../../cw.model';
import { defaultColor } from '../cw-color-picker/cw-color-picker.operator';

@Component({
  selector: 'cw-draw-line',
  templateUrl: './cw-draw-line.component.html',
  styleUrls: ['./cw-draw-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwDrawLineComponent {

  @Input() lineWidthMax = 30;

  @Input() drawOptions: DrawOptions = {
    strokeStyle: defaultColor,
    lineWidth: 6
  };

  @Output() drawOptionsChange = new EventEmitter<DrawOptions>();

  emit() {
    this.drawOptionsChange.emit(this.drawOptions);
  }
}
