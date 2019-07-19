import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

export type ServiceWorkerUpdateType = 'available' | 'activated';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  updatesType$ = merge(
    this.updates.available,
    this.updates.activated
  ).pipe(
    map((update) => update.type === 'UPDATE_AVAILABLE' ? 'available' : 'activated')
  );

  constructor(private updates: SwUpdate) { }
}
