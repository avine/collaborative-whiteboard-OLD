import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Demo1Component } from './components/demo1/demo1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/demo1',
    pathMatch: 'full'
  },
  {
    path: 'demo1',
    component: Demo1Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
