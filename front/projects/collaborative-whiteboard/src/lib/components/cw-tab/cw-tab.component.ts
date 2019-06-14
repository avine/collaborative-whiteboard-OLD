import { Component, Input, OnChanges, TemplateRef, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cw-tab',
  templateUrl: './cw-tab.component.html',
  styleUrls: ['./cw-tab.component.scss']
})
export class CwTabComponent/* implements OnChanges*/ {
  @Input() content: TemplateRef<any>;

  @Input() active = false;

  @Output() activeChange = new EventEmitter<boolean>();

  @ViewChild('label', { static: true }) label: TemplateRef<any>;

  /*ngOnChanges({ active }: SimpleChanges) {
    if (active) {
      this.activeChange.emit(active.currentValue); // Useless...
    }
  }*/
}
