import { first, take } from 'rxjs/operators';

import { TestBed } from '@angular/core/testing';

import { DrawEvent, DrawTransport } from './cw.model';
import { getDrawEvent, getDrawEventsWithMapping } from './cw.model.mock';
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
    it('should cause emit$ to emit consolidated event', () => {
      const service: CwService = TestBed.get(CwService);
      const emitHandler = jest.fn();
      const event = getDrawEvent();
      const owner = 1;
      const eventWithOwner: DrawEvent = { ...event, owner };
      const expected: DrawTransport = {
        action: 'add',
        events: [eventWithOwner],
      };

      // Given
      service.owner = owner;
      service.emit$.pipe(first()).subscribe(emitHandler);
      // When
      service.emit(event);
      // Then
      expect(emitHandler).toHaveBeenCalledWith(expected);
    });

    it('should cause history$ to emit consolidated event', () => {
      const service: CwService = TestBed.get(CwService);
      const historyHandler = jest.fn();
      const event1 = getDrawEvent();
      const event2 = getDrawEvent();
      const owner = 'me';
      const historyEvent1: DrawEvent = { ...event1, owner };
      const historyEvent2: DrawEvent = { ...event2, owner };
      const expected1 = [historyEvent1];
      const expected2 = [historyEvent1, historyEvent2];

      // Given
      service.owner = owner;
      service.history$.pipe(take(3)).subscribe(historyHandler);
      // When
      service.emit(event1);
      service.emit(event2);
      // Then
      expect(historyHandler).toHaveBeenNthCalledWith(2, expected1);
      expect(historyHandler).toHaveBeenNthCalledWith(3, expected2);
    });
  });

  describe('broadcast()', () => {
    it('should cause broadcast$ to emit when "add" event occurs', () => {
      const service: CwService = TestBed.get(CwService);
      const broadcastHandler = jest.fn();
      const { transport, broadcast: expected } = getDrawEventsWithMapping({ action: 'add' });

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
      const { transport } = getDrawEventsWithMapping({ action: 'remove' });

      // Given
      service.broadcast$.pipe(first()).subscribe(broadcastHandler);
      // When
      service.broadcast(transport);
      // Then
      expect(broadcastHandler).not.toHaveBeenCalled();
    });
  });
});
