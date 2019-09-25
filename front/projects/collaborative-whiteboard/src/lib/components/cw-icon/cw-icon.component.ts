import { Component, Input } from '@angular/core';

@Component({
  selector: 'cw-icon',
  templateUrl: './cw-icon.component.html',
  styleUrls: ['./cw-icon.component.scss'],
})
export class CwIconComponent {
  @Input() icon:
    | 'drawLine'
    | 'undo'
    | 'redo'
    | 'cut'
    | 'undoAll'
    | 'noGuides'
    | 'redraw'
    | 'expand'
    | 'collapse'
    | 'drag'
    | 'dispose';
}
