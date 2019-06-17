import {
    Component, EventEmitter, Input, OnChanges, Output, TemplateRef, ViewChild, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'cw-tab',
  templateUrl: './cw-tab.component.html',
  styleUrls: ['./cw-tab.component.scss']
})
export class CwTabComponent implements OnChanges {
  @Input() content: TemplateRef<any>;

  @Input() active = false;

  @Output() activeChange = new EventEmitter<boolean>();

  @ViewChild('label', { static: true }) label: TemplateRef<any>;

  ngOnChanges({ active }: SimpleChanges) {
    if (active && !active.firstChange) {
      this.activeChange.emit(this.active);
    }
  }
}
