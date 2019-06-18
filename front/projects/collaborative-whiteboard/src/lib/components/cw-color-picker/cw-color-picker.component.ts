import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import { defaultColors } from './cw-color-picker.operator';

@Component({
  selector: 'cw-cw-color-picker',
  templateUrl: './cw-color-picker.component.html',
  styleUrls: ['./cw-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwColorPickerComponent implements OnInit {

  @Input() colors = defaultColors;

  @Input() color: string;

  @Output() colorChange = new EventEmitter<string>();

  breakIndex = Math.round(this.colors.length / 3);

  constructor() { }

  ngOnInit() {
  }

  updateColor(color: string) {
    this.color = color;
    this.colorChange.emit(color);
  }
}
