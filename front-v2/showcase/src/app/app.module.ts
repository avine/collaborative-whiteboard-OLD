import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CollaborativeWhiteboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
