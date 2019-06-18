import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { contentIcons } from './cw-tool-content.operator';

@Component({
  selector: 'cw-cw-tool-content',
  templateUrl: './cw-tool-content.component.html',
  styleUrls: ['./cw-tool-content.component.scss']
})
export class CwToolContentComponent implements OnInit {
  icons = contentIcons;

  @Input() title: string;

  @Input() content: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
