import { elementAt, first, take } from 'rxjs/operators';

import { TestBed } from '@angular/core/testing';

import { CwService } from './cw.service';

describe('CwService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CwService],
    }),
  );

  it('should be created', () => {
    const service: CwService = TestBed.get(CwService);
    expect(service).toBeTruthy();
  });

  describe('emit', () => {
    it('should emit emit$', done => {
      const service: CwService = TestBed.get(CwService);

      // Given
      service.emit$.pipe(first()).subscribe(emitHandler);

      // When
      service.emit({ type: 'point', data: [0, 0] } as any);

      // Then
      function emitHandler(received: any) {
        const expected = {
          action: 'add',
          events: [{ type: 'point', data: [0, 0] }],
        };
        expect(received).toMatchObject(expected);
        done();
      }
    });

    it('should emit history$', done => {
      const service: CwService = TestBed.get(CwService);

      // Given
      service.history$.pipe(elementAt(1)).subscribe(historyHandler);

      // When
      service.emit({ type: 'point', data: [0, 0] } as any);

      // Then
      function historyHandler(received: any) {
        const expected = [{ type: 'point', data: [0, 0] }];
        expect(received).toMatchObject(expected);
        done();
      }
    });

    it('should emit history$', done => {
      const service: CwService = TestBed.get(CwService);
      let count = 0;

      // Given
      service.history$.pipe(take(3)).subscribe(historyHandler);

      // When
      service.emit({ type: 'point', data: [0, 0] } as any);
      service.emit({ type: 'point', data: [1, 1] } as any);

      // Then
      function historyHandler(received: any) {
        switch (count) {
          case 1: {
            const expected = [{ type: 'point', data: [0, 0] }];
            expect(received).toMatchObject(expected);
            break;
          }
          case 2: {
            const expected = [
              { type: 'point', data: [0, 0] },
              { type: 'point', data: [1, 1] },
            ];
            expect(received).toMatchObject(expected);
            done();
            break;
          }
        }
        count++;
      }
    });
  });

  it('should broadcast', done => {
    const service: CwService = TestBed.get(CwService);

    // Given
    service.broadcast$.pipe(first()).subscribe(broadcastHandler);

    // When
    service.broadcast({
      action: 'add',
      events: [{ type: 'point', data: [0, 0] } as any],
    });

    // Then
    function broadcastHandler(received: any) {
      expect(received).toBeTruthy();
      done();
    }
  });
});
