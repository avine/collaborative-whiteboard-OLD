import { TestBed } from '@angular/core/testing';

import { CwService } from './cw.service';
import { DrawEvent } from './cw.model';

describe('CwService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CwService]
  }));

  it('should be created', () => {
    const service: CwService = TestBed.get(CwService);
    expect(service).toBeTruthy();
  });

  it('should broadcast', (done) => {
    const service: CwService = TestBed.get(CwService);

    // Given
    const subscription = service.broadcast$.subscribe(events => {
      // Then
      expect(events).toBeTruthy();
      subscription.unsubscribe();
      done();
    });

    // When
    service.broadcast({
      action: 'add',
      events: [{ type: 'point', data: [0, 0] } as DrawEvent] },
    );
  });
});
