import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { contentIcons } from './cw-tool-content.operator';

@Component({
  selector: 'cw-cw-tool-content',
  templateUrl: './cw-tool-content.component.html',
  styleUrls: ['./cw-tool-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwToolContentComponent {
  icons = contentIcons;

  @Input() title: string;

  @Input() content: TemplateRef<any>;
}
