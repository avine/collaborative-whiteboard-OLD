import { Subscription } from 'rxjs';

import { Component, Inject, OnDestroy } from '@angular/core';
import { faDownload, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { WINDOW } from './providers/window.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  userIcon = faUserCircle;
  update = faDownload;

  popup: 'update' | '' = '';

  subscription: Subscription;

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closePopup(reload = false) {
    this.popup = '';
    if (reload && this.window) {
      this.window.location.reload();
    }
  }
}
