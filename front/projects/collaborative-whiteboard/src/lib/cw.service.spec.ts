import { first, take } from 'rxjs/operators';

import { TestBed } from '@angular/core/testing';

import { BroadcastDrawEvents, DrawEvent, DrawTransport } from './cw.model';
import { getDrawEvent, getDrawEventsWithMapping } from './cw.model.mock';
import { getClearEvent } from './cw.operator';
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
    describe('broadcastAdd()', () => {
      it('should cause broadcast$ to emit', () => {
        const service: CwService = TestBed.get(CwService);
        const broadcastHandler = jest.fn();
        const { transport, broadcast: expected } = getDrawEventsWithMapping({
          action: 'add',
        });

        // Given
        service.broadcast$.pipe(first()).subscribe(broadcastHandler);
        // When
        service.broadcast(transport);
        // Then
        expect(broadcastHandler).toHaveBeenCalledWith(expected);
      });

      it('should cause history$ to emit', () => {
        const service: CwService = TestBed.get(CwService);
        const historyHandler = jest.fn();
        const { events: expected, transport } = getDrawEventsWithMapping({
          action: 'add',
        });

        // Given
        service.history$.pipe(take(2)).subscribe(historyHandler);
        // When
        service.broadcast(transport);
        // Then
        expect(historyHandler).toHaveBeenNthCalledWith(2, expected);
      });
    });

    describe('broadcastRemove()', () => {
      it('should cause broadcast$ to emit', () => {
        const service: CwService = TestBed.get(CwService);
        const broadcastHandler = jest.fn();
        const {
          events: [event1, event2, event3],
          transport: transportAdd,
        } = getDrawEventsWithMapping({
          eventsNumber: 3,
          action: 'add',
        });
        const transportRemove: DrawTransport = {
          action: 'remove',
          events: [event2],
        };
        const expected: BroadcastDrawEvents = {
          animate: false,
          events: [getClearEvent(), event1, event3],
        };

        // Given
        service.broadcast(transportAdd);
        service.broadcast$.pipe(first()).subscribe(broadcastHandler);
        // When
        service.broadcast(transportRemove);
        // Then
        expect(broadcastHandler).toHaveBeenCalledWith(expected);
      });

      it('should cause history$ to emit', () => {
        const service: CwService = TestBed.get(CwService);
        const historyHandler = jest.fn();
        const {
          events: [event1, event2, event3],
          transport: transportAdd,
        } = getDrawEventsWithMapping({
          eventsNumber: 3,
          action: 'add',
        });
        const transportRemove: DrawTransport = {
          action: 'remove',
          events: [event2],
        };
        const expected: DrawEvent[] = [event1, event3];

        // Given
        service.broadcast(transportAdd);
        service.history$.pipe(take(2)).subscribe(historyHandler);
        // When
        service.broadcast(transportRemove);
        // Then
        expect(historyHandler).toHaveBeenCalledWith(expected);
      });
    });
  });
});
