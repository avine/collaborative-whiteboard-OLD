import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'cw-tool-content',
  templateUrl: './cw-tool-content.component.html',
  styleUrls: ['./cw-tool-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CwToolContentComponent {
  @Input() title: string;

  @Input() content: TemplateRef<any>;

  @Output() dispose = new EventEmitter<void>();
}
