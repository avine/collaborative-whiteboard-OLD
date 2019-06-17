import {
    Component, EventEmitter, Input, OnChanges, Output, TemplateRef, ViewChild, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'cw-tool',
  templateUrl: './cw-tool.component.html',
  styleUrls: ['./cw-tool.component.scss']
})
export class CwToolComponent implements OnChanges {
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
