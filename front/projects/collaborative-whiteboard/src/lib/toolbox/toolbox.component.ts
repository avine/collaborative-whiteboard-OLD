import {
    AfterViewInit, Component, ContentChild, EmbeddedViewRef, EventEmitter, Input, OnInit, Output,
    TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import {
    faCut, faPaintBrush, faPlay, faRedoAlt, faTrash, faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

import { ToolboxCutDirective } from '../directives/toolbox-cut.directive';
import { ToolboxDrawLineDirective } from '../directives/toolbox-draw-line.directive';
import { ToolboxAction, ToolboxActionType } from './toolbox.model';

const drawLine = faPaintBrush;
const redraw = faPlay;
const undo = faUndoAlt;
const redo = faRedoAlt;
const cut = faCut;
const undoAll = faTrash;

@Component({
  selector: 'cw-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit, AfterViewInit {

  @Input() actions: ToolboxAction[] = [
    { type: 'drawLine', mode: 'toggle', icon: drawLine },
    { type: 'redraw', mode: 'click', icon: redraw },
    { type: 'undo', mode: 'click', icon: undo },
    { type: 'redo', mode: 'click', icon: redo },
    { type: 'cut', mode: 'toggle', icon: cut },
    { type: 'undoAll', mode: 'click', icon: undoAll }
  ];

  @Input() actionType: ToolboxActionType;

  @Output() actionTypeChange = new EventEmitter<ToolboxActionType>();

  @ContentChild(ToolboxDrawLineDirective, { static: false, read: TemplateRef })
  private drawLineTmplRef: TemplateRef<any>;

  @ContentChild(ToolboxCutDirective, { static: false, read: TemplateRef })
  private cutTmplRef: TemplateRef<any>;

  @ViewChild('viewContainer', { static: false, read: ViewContainerRef }) viewContainer: ViewContainerRef;

  embeddedView: EmbeddedViewRef<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.actionType) {
      this.updateView(this.actionType);
    }
  }

  actionHandler(type: ToolboxActionType) {
    const mode = this.getMode(type);

    if (mode === 'toggle' && type === this.actionType) {
      this.updateAction(null);
      this.updateView(null);
    } else {
      this.updateAction(type);
      this.updateView(type);
    }
  }

  private updateAction(type: ToolboxActionType) {
    this.actionType = type;
    this.actionTypeChange.emit(type);
  }

  private updateView(type: ToolboxActionType) {
    this.destroyView();
    if (type === 'drawLine' && this.drawLineTmplRef) {
      this.createView(this.drawLineTmplRef);
    } else if (type === 'cut' && this.cutTmplRef) {
      this.createView(this.cutTmplRef);
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

  private getMode(type: ToolboxActionType) {
    return this.actions.find(action => action.type === type).mode;
  }
}
