import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CwCanvasComponent } from './components/cw-canvas/cw-canvas.component';
import { CwCutComponent } from './components/cw-cut/cw-cut.component';
import { CwDrawLineComponent } from './components/cw-draw-line/cw-draw-line.component';
import { CwToolsComponent } from './components/cw-tools/cw-tools.component';
import { CwWhiteboardComponent } from './components/cw-whiteboard/cw-whiteboard.component';
import { CwCutToolDirective } from './directives/cw-cut-tool.directive';
import { CwDrawLineToolDirective } from './directives/cw-draw-line-tool.directive';

const features = [
  CwCanvasComponent,
  CwCutComponent,
  CwDrawLineComponent,
  CwWhiteboardComponent,
  CwToolsComponent,

  CwCutToolDirective,
  CwDrawLineToolDirective
];

@NgModule({
  declarations: [
    features
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    features
  ]
})
export class CollaborativeWhiteboardModule { }
