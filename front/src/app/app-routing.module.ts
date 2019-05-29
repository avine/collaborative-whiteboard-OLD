import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/canvas',
    pathMatch: 'full'
  },
  {
    path: 'canvas',
    component: CanvasComponent
  },
  {
    path: 'canvas-mirror',
    component: CanvasMirrorComponent
  },
  {
    path: 'whiteboard',
    component: WhiteboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
