import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { Whiteboard2Component } from './components/whiteboard2/whiteboard2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
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
  {
    path: 'whiteboard2',
    component: Whiteboard2Component
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
