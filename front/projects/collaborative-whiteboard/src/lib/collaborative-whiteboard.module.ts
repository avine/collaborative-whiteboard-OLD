import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvasDrawComponent } from './canvas-draw/canvas-draw.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CollaborativeWhiteboardComponent } from './collaborative-whiteboard.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    CollaborativeWhiteboardComponent,
    CanvasDrawComponent,
    CanvasComponent,
    WhiteboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollaborativeWhiteboardComponent,
    CanvasDrawComponent,
    CanvasComponent,
    WhiteboardComponent
  ]
})
export class CollaborativeWhiteboardModule { }
