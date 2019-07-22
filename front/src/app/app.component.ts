import { Subscription } from 'rxjs';

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { faDownload, faTint, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { WINDOW } from './providers/window.provider';
import { ServiceWorkerService } from './services/service-worker.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  themeIcon = faTint;
  userIcon = faUserCircle;
  update = faDownload;

  popup: 'update' | '' = '';

  subscription: Subscription;

  constructor(
    public themeService: ThemeService,
    private serviceWorkerService: ServiceWorkerService,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.subscription = this.serviceWorkerService.updatesAvailable$
      .subscribe(() => this.popup = 'update');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closePopup(reload: boolean) {
    this.popup = '';
    if (reload && this.window) {
      this.window.location.reload();
    }
  }
}
