import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { Whiteboard2Component } from './components/whiteboard2/whiteboard2.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CanvasMirrorComponent,
    WhiteboardComponent,
    Whiteboard2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CollaborativeWhiteboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
