import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvasComponent } from './canvas/canvas.component';
import { CollaborativeWhiteboardComponent } from './collaborative-whiteboard.component';

@NgModule({
  declarations: [
    CollaborativeWhiteboardComponent,
    CanvasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollaborativeWhiteboardComponent,
    CanvasComponent
  ]
})
export class CollaborativeWhiteboardModule { }
