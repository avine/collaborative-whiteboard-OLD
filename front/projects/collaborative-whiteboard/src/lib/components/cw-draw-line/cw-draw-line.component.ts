import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DrawOptions } from '../../cw.model';

@Component({
  selector: 'cw-draw-line',
  templateUrl: './cw-draw-line.component.html',
  styleUrls: ['./cw-draw-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwDrawLineComponent {

  @Input() drawOptions: DrawOptions = {
    strokeStyle: '#29B6F6',
    lineWidth: 6
  };

  @Output() drawOptionsChange = new EventEmitter<DrawOptions>();

  emit() {
    this.drawOptionsChange.emit(this.drawOptions);
  }
}
