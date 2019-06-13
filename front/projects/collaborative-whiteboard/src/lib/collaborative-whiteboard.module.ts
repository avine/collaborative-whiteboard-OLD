import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CanvasComponent } from './components/canvas/canvas.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { ToolboxCutDirective } from './directives/toolbox-cut.directive';
import { ToolboxDrawLineDirective } from './directives/toolbox-draw-line.directive';

@NgModule({
  declarations: [
    CanvasComponent,
    WhiteboardComponent,
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
    CanvasComponent,
    WhiteboardComponent,
    ToolboxComponent,
    ToolboxCutDirective,
    ToolboxDrawLineDirective
  ]
})
export class CollaborativeWhiteboardModule { }
