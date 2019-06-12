import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CanvasComponent } from './canvas/canvas.component';
import { CollaborativeWhiteboardComponent } from './collaborative-whiteboard.component';
import { ToolboxCutDirective } from './directives/toolbox-cut.directive';
import { ToolboxDrawLineDirective } from './directives/toolbox-draw-line.directive';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  declarations: [
    CollaborativeWhiteboardComponent,
    CanvasComponent,
    ToolboxComponent,
    ToolboxCutDirective,
    ToolboxDrawLineDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CollaborativeWhiteboardComponent,
    CanvasComponent,
    ToolboxComponent,
    ToolboxCutDirective,
    ToolboxDrawLineDirective
  ]
})
export class CollaborativeWhiteboardModule { }
