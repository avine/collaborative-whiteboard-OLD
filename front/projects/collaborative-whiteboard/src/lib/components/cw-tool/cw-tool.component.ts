import {
    Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';

@Component({
  selector: 'cw-tool',
  templateUrl: './cw-tool.component.html',
  styleUrls: ['./cw-tool.component.scss']
})
export class CwToolComponent implements OnChanges {

  @Input() title: string;

  @Input() content: TemplateRef<any>;

  /**
   * By default, when `content` is NOT provided, `active` is always `false`, and `activeChange` always emits `true`.
   * When "switch mode" is enabled, `active` is alternately `true` and `false`.
   */
  @Input() noContentSwitchMode = false;

  @Input() active = false;

  @Output() activeChange = new EventEmitter<boolean>();

  @ViewChild('label', { static: true }) label: TemplateRef<any>;

  ngOnChanges({ active }: SimpleChanges) {
    if (active && !active.firstChange) {
      this.activeChange.emit(this.active);
    }
  }
}
