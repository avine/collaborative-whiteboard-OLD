import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { getDefaultColors } from '../../cw.operator';

@Component({
  selector: 'cw-color-picker',
  templateUrl: './cw-color-picker.component.html',
  styleUrls: ['./cw-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CwColorPickerComponent {
  @Input() colors = getDefaultColors();

  @Input() color: string;

  @Output() colorChange = new EventEmitter<string>();

  breakIndex = Math.round(this.colors.length / 3);

  updateColor(color: string) {
    this.color = color;
    this.colorChange.emit(color);
  }

  trackByColor(index: number, color: string) {
    return color;
  }
}
