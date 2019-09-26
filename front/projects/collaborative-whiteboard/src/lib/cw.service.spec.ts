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

  describe('history$', () => {
    it('should emit empty array even when no event occured', () => {
      const service: CwService = TestBed.get(CwService);
      const historyHandler = jest.fn();
      const expected = [];
      // Given
      service.history$.pipe(take(1)).subscribe(historyHandler);
      // When
      // Then
      expect(historyHandler).toHaveBeenCalledWith(expected);
    });
  });

  describe('emit()', () => {
    it('should cause emit$ to emit', () => {
      const service: CwService = TestBed.get(CwService);
      const emitHandler = jest.fn();
      const event: any = { type: 'point', data: [0, 0] };
      const expected = {
        action: 'add',
        events: [expect.objectContaining(event)],
      };
      // Given
      service.emit$.pipe(first()).subscribe(emitHandler);
      // When
      service.emit(event);
      // Then
      expect(emitHandler).toHaveBeenCalledWith(expected);
    });

    /*it('should emit history$', () => {
      const service: CwService = TestBed.get(CwService);
      const historyHandler = jest.fn();
      const event: any = { type: 'point', data: [0, 0] };
      const expected = [expect.objectContaining(event)];
      // Given
      service.history$.pipe(elementAt(1)).subscribe(historyHandler);
      // When
      service.emit(event);
      // Then
      expect(historyHandler).toHaveBeenCalledWith(expected);
    });*/

    it('should cause history$ to emit', () => {
      const service: CwService = TestBed.get(CwService);
      const historyHandler = jest.fn();
      const events: any = [
        { type: 'point', data: [0, 0] },
        { type: 'point', data: [1, 1] },
      ];
      const expected = [
        [expect.objectContaining(events[0])],
        [
          expect.objectContaining(events[0]),
          expect.objectContaining(events[1]),
        ],
      ];
      // Given
      service.history$.pipe(take(3)).subscribe(historyHandler);
      // When
      service.emit(events[0]);
      service.emit(events[1]);
      // Then
      expect(historyHandler).toHaveBeenNthCalledWith(2, expected[0]);
      expect(historyHandler).toHaveBeenNthCalledWith(3, expected[1]);
    });
  });

  describe('broadcast()', () => {
    it('should cause broadcast$ to emit when "add" event occurs', () => {
      const service: CwService = TestBed.get(CwService);
      const broadcastHandler = jest.fn();
      const event: any = { type: 'point', data: [0, 0] };
      const transport: any = { action: 'add', events: [event] };
      const expected = expect.objectContaining({
        events: [expect.objectContaining(event)],
      });
      // Given
      service.broadcast$.pipe(first()).subscribe(broadcastHandler);
      // When
      service.broadcast(transport);
      // Then
      expect(broadcastHandler).toHaveBeenCalledWith(expected);
    });

    it('should NOT cause broadcast$ to emit when "remove" event occurs', () => {
      const service: CwService = TestBed.get(CwService);
      const broadcastHandler = jest.fn();
      const event: any = { type: 'point', data: [0, 0], options: {} };
      const transport: any = { action: 'remove', events: [event] };
      // Given
      service.broadcast$.pipe(first()).subscribe(broadcastHandler);
      // When
      service.broadcast(transport);
      // Then
      expect(broadcastHandler).not.toHaveBeenCalled();
    });
  });
});
