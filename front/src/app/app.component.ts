import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCheck, faDownload, faTint, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { ServiceWorkerService, ServiceWorkerUpdateType } from './services/service-worker.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  themeIcon = faTint;
  userIcon = faUserCircle;
  popup = {
    available: faDownload,
    activated: faCheck
  };

  updatesType: ServiceWorkerUpdateType | '' = '';

  subscription: Subscription;

  constructor(
    public themeService: ThemeService,
    private serviceWorkerService: ServiceWorkerService
  ) { }

  ngOnInit() {
    this.subscription = this.serviceWorkerService.updatesType$.subscribe(
      updatesType => this.updatesType = updatesType
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closePopup() {
    this.updatesType = '';
  }
}
