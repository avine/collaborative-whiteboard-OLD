import {
    AfterViewInit, Component, ContentChild, EmbeddedViewRef, EventEmitter, Input, OnInit, Output,
    TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';

import { CwCutToolDirective } from '../../directives/cw-cut-tool.directive';
import { CwDrawLineToolDirective } from '../../directives/cw-draw-line-tool.directive';
import { getDefaultTools } from './cw-tools.operator';
import { ToolType } from './cw-tools.model';

@Component({
  selector: 'cw-tools',
  templateUrl: './cw-tools.component.html',
  styleUrls: ['./cw-tools.component.scss']
})
export class CwToolsComponent implements OnInit, AfterViewInit {

  @Input() tools = getDefaultTools();

  @Input() toolType: ToolType;

  @Output() toolTypeChange = new EventEmitter<ToolType>();

  @ContentChild(CwDrawLineToolDirective, { static: false, read: TemplateRef })
  private drawLineTmplRef: TemplateRef<any>;

  @ContentChild(CwCutToolDirective, { static: false, read: TemplateRef })
  private cutTmplRef: TemplateRef<any>;

  @ViewChild('viewContainer', { static: false, read: ViewContainerRef }) viewContainer: ViewContainerRef;

  embeddedView: EmbeddedViewRef<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.toolType) {
      this.updateView(this.toolType);
    }
  }

  toolHandler(type: ToolType) {
    const mode = this.getMode(type);

    if (mode === 'toggle' && type === this.toolType) {
      this.updateToolType(null);
      this.updateView(null);
    } else {
      this.updateToolType(type);
      this.updateView(type);
    }
  }

  private updateToolType(type: ToolType) {
    this.toolType = type;
    this.toolTypeChange.emit(type);
  }

  private updateView(type: ToolType) {
    if (type === 'drawLine' && this.drawLineTmplRef) {
      this.destroyView();
      this.createView(this.drawLineTmplRef);
    } else if (type === 'cut' && this.cutTmplRef) {
      this.destroyView();
      this.createView(this.cutTmplRef);
    } else if (!type) {
      this.destroyView();
    }
  }

  private createView(tmplRef: TemplateRef<any>) {
    this.embeddedView = this.viewContainer.createEmbeddedView(tmplRef);
  }

  private destroyView() {
    if (this.embeddedView) {
      this.embeddedView.destroy();
      this.embeddedView = null;
    }
  }

  private getMode(type: ToolType) {
    return this.tools.find(action => action.type === type).mode;
  }
}
