import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WhiteboardComponent
  },
  {
    path: '**',
    component: WhiteboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
