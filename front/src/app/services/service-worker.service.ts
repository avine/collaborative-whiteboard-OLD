import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  updatesAvailable$ = this.updates.available;

  constructor(private updates: SwUpdate) { }
}
