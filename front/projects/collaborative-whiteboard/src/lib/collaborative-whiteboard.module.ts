import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CanvasComponent } from './canvas/canvas.component';
import { CollaborativeWhiteboardComponent } from './collaborative-whiteboard.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  declarations: [
    CollaborativeWhiteboardComponent,
    CanvasComponent,
    ToolboxComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CollaborativeWhiteboardComponent,
    CanvasComponent,
    ToolboxComponent
  ]
})
export class CollaborativeWhiteboardModule { }
