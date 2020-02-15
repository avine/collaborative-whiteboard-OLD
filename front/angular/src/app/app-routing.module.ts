import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasBasicComponent } from './pages/canvas-basic/canvas-basic.component';
import { CanvasMirrorComponent } from './pages/canvas-mirror/canvas-mirror.component';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { TextComponent } from './pages/text/text.component';
import { WhiteboardComponent } from './pages/whiteboard/whiteboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'canvas-basic',
    component: CanvasBasicComponent,
  },
  {
    path: 'canvas-mirror',
    component: CanvasMirrorComponent,
  },
  {
    path: 'whiteboard',
    component: WhiteboardComponent,
  },
  {
    path: 'tabs',
    component: TabsComponent,
  },
  {
    path: 'text',
    component: TextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
