import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CwCanvasComponent } from './components/cw-canvas/cw-canvas.component';
import { CwToolsComponent } from './components/cw-tools/cw-tools.component';
import { CwWhiteboardComponent } from './components/cw-whiteboard/cw-whiteboard.component';
import { CwCutToolDirective } from './directives/cw-cut-tool.directive';
import { CwDrawLineToolDirective } from './directives/cw-draw-line-tool.directive';

@NgModule({
  declarations: [
    CwCanvasComponent,
    CwWhiteboardComponent,
    CwToolsComponent,
    CwCutToolDirective,
    CwDrawLineToolDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CwCanvasComponent,
    CwWhiteboardComponent,
    CwToolsComponent,
    CwCutToolDirective,
    CwDrawLineToolDirective
  ]
})
export class CollaborativeWhiteboardModule { }
