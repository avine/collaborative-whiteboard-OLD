import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasMirrorComponent } from './components/canvas-mirror/canvas-mirror.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { DemoComponent } from './components/demo/demo.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CanvasMirrorComponent,
    DemoComponent,
    WhiteboardComponent,
    TabsComponent,
    HomeComponent
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
