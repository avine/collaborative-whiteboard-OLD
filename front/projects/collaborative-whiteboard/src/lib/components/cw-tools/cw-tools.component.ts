import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CwService } from '../../cw.service';
import { icons } from './cw-tools.operator';
import { DrawOptions } from '../../cw.model';
import { getDefaultDrawOptions } from '../../cw.operator';

@Component({
  selector: 'cw-tools',
  templateUrl: './cw-tools.component.html',
  styleUrls: ['./cw-tools.component.scss']
})
export class CwToolsComponent implements OnInit {
  icons = icons;

  @Input() drawOptions = getDefaultDrawOptions();

  @Output() drawOptionsChange = new EventEmitter<DrawOptions>();

  constructor(public service: CwService) { }

  ngOnInit() {
  }

  updateDrawOptions(drawOptions: DrawOptions) {
    this.drawOptions = drawOptions;
    this.drawOptionsChange.emit(drawOptions);
  }
}
