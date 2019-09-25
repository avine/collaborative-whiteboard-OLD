import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CanvasBasicComponent } from './pages/canvas-basic/canvas-basic.component';
import { CanvasMirrorComponent } from './pages/canvas-mirror/canvas-mirror.component';
import { DemoComponent } from './pages/demo/demo.component';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { TextComponent } from './pages/text/text.component';
import { WhiteboardComponent } from './pages/whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasBasicComponent,
    CanvasMirrorComponent,
    DemoComponent,
    HeaderComponent,
    HomeComponent,
    TabsComponent,
    TextComponent,
    WhiteboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CollaborativeWhiteboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
