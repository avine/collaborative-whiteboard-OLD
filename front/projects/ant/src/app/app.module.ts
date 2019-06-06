import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborativeWhiteboardModule } from '@collaborative-whiteboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    CollaborativeWhiteboardModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
