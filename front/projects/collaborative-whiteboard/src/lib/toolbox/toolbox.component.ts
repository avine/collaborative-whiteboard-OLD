import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    faCut, faPaintBrush, faRedoAlt, faTrash, faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

import { ToolboxAction, ToolboxActionType } from './toolbox.model';

const drawLine = faPaintBrush;
const undo = faUndoAlt;
const redo = faRedoAlt;
const cut = faCut;
const undoAll = faTrash;

@Component({
  selector: 'cw-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

  @Input() action: ToolboxActionType = 'drawLine';

  @Output() actionChange = new EventEmitter<ToolboxActionType>();

  actions: ToolboxAction[] = [
    { type: 'drawLine', icon: drawLine  },
    { type: 'undo'    , icon: undo      },
    { type: 'redo'    , icon: redo      },
    { type: 'cut'     , icon: cut       },
    { type: 'undoAll' , icon: undoAll   },
  ];

  constructor() { }

  ngOnInit() {
  }

  actionHandler(type: ToolboxActionType) {
    this.action = type;
    this.actionChange.emit(type);
  }
}
