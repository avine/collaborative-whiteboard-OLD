import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DrawOptions } from '../../cw.model';

@Component({
  selector: 'cw-draw-line',
  templateUrl: './cw-draw-line.component.html',
  styleUrls: ['./cw-draw-line.component.scss']
})
export class CwDrawLineComponent implements OnInit {
  @Input() drawOptions: DrawOptions = {
    strokeStyle: 'grey',
    lineWidth: 6
  };

  @Output() drawOptionsChange = new EventEmitter<DrawOptions>();

  constructor() { }

  ngOnInit() {
  }

  emit() {
    this.drawOptionsChange.emit(this.drawOptions);
  }
}
