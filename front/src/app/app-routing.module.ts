import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasBasicComponent } from './components/canvas-basic/canvas-basic.component';
import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { DemoComponent } from './components/demo/demo.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TextComponent } from './components/text/text.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

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
    path: 'canvas-basic',
    component: CanvasBasicComponent
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
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'text',
    component: TextComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
