import { connect } from 'socket.io-client';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket = connect(environment.socketIoUri);

  constructor() { }
}
