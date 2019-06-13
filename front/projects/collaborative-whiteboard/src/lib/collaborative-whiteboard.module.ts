import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CwCanvasComponent } from './components/cw-canvas/cw-canvas.component';
import { CwToolboxComponent } from './components/cw-toolbox/cw-toolbox.component';
import { CwWhiteboardComponent } from './components/cw-whiteboard/cw-whiteboard.component';
import { ToolboxCutDirective } from './directives/toolbox-cut.directive';
import { ToolboxDrawLineDirective } from './directives/toolbox-draw-line.directive';

@NgModule({
  declarations: [
    CwCanvasComponent,
    CwWhiteboardComponent,
    CwToolboxComponent,
    ToolboxCutDirective,
    ToolboxDrawLineDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CwCanvasComponent,
    CwWhiteboardComponent,
    CwToolboxComponent,
    ToolboxCutDirective,
    ToolboxDrawLineDirective
  ]
})
export class CollaborativeWhiteboardModule { }
