import * as io from 'socket.io-client';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket = io(environment.socketIoUri);

  constructor() { }
}
