import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
    BroadcastDrawEvents, CutRange, CutRangeArg, DrawEvent, DrawTransport, Owner
} from './collaborative-whiteboard.model';
import {
    broadcastDrawEventsMapper, getClearEvent, getHash, normalizeCutRange
} from './collaborative-whiteboard.operator';

@Injectable()
export class CollaborativeWhiteboardService {
  private historyMap = new Map<string, DrawEvent>();

  private historyRedo: DrawEvent[][] = [];

  private history$$ = new BehaviorSubject<DrawEvent[]>([]);

  private cutRange$$ = new BehaviorSubject<CutRange>([0, 0]);

  /**
   * Dispatch draw events from the server to the client
   */
  private broadcast$$ = new Subject<BroadcastDrawEvents>();

  /**
   * Dispatch draw events from the client to the server
   */
  private emit$$ = new Subject<DrawTransport[]>();

  history$ = this.history$$.asObservable();

  historyCut$ = this.history$$.pipe(map(history => this.getOwnerDrawEvents(history)));

  cutRange$ = this.cutRange$$.asObservable();

  broadcastHistoryCut$ = combineLatest(this.historyCut$, this.cutRange$$).pipe(
    map(([historyCut, [from, to]]) => {
      const slice = [getClearEvent(), ...historyCut.slice(from, to + 1)];
      return broadcastDrawEventsMapper(slice);
    })
  );

  broadcast$ = this.broadcast$$.asObservable();

  emit$ = this.emit$$.asObservable();

  owner: Owner;

  constructor() { }

  private pushHistory(event: DrawEvent) {
    event.options = { ...event.options }; // Make this immutable!
    const hash = getHash(event);
    this.historyMap.set(hash, event);
    this.dropHistoryRedoAgainst(hash);
  }

  private pullHistory(event: DrawEvent): boolean {
    const hash = getHash(event);
    return this.historyMap.delete(hash);
  }

  private popHistory(hash = this.getOwnerLastHash()): DrawEvent {
    const removed = this.historyMap.get(hash);
    if (removed) {
      this.historyMap.delete(hash);
      return removed;
    }
  }

  private addHistoryRedo(events: DrawEvent[]) {
    this.historyRedo.unshift(events);
  }

  private dropHistoryRedoAgainst(hash: string) {
    while (this.historyRedo.length) {
      const events = this.historyRedo.shift();
      while (events.length) {
        const event = events.shift();
        if (getHash(event) === hash) {
          return;
        }
      }
    }
  }

  private get history(): DrawEvent[] {
    return Array.from(this.historyMap.values());
  }

  private emitHistory() {
    // Making the emitted values immutable has an advantage!
    //
    // For more details, see the `CanvasCutComponent` that consumes the `history$`
    // observable and still uses the `ChangeDetectionStrategy.OnPush`.
    //
    //    <app-canvas-cut [history]="whiteboard.history$ | async"></app-canvas-cut>
    //
    this.history$$.next(this.history);
  }

  private setDrawEventOwner(event: DrawEvent): DrawEvent {
    return { ...event, owner: this.owner };
  }

  private getOwnerDrawEvents(events: DrawEvent[]) {
    return events.filter(event => event.owner === this.owner);
  }

  private getOwnerLastHash(): string {
    let lastHash: string;
    for (const [hash, event] of this.historyMap.entries()) {
      if (event.owner === this.owner) {
        lastHash = hash;
      }
    }
    return lastHash;
  }

  broadcast(transport: DrawTransport[]) {
    const removeHash: string[] = [];
    const addEvent: DrawEvent[] = [];
    transport.forEach(t => {
      if (t.events.type === 'clear') {
        // Notice:
        // This case should NOT occurs anymore after clear events are NOT emitted...
        // Thus, this `if` case should be removed...
        // Or let say that it is still relevant for "moderator" as a red button to clear the canvas...
        // FIXME: Hack
        // The clear event data should be: `[undefined, undefined, undefined, undefined]`.
        // But after it was stringified in the wire it becomes: `[null, null, null, null]`.
        // Thus, we must restore the real clear event data structure,
        // otherwise the method `CanvasComponent.drawClear` will not work properly...
        t.events = getClearEvent();
      }
      switch (t.action) {
        case 'remove': {
          const hash = getHash(t.events);
          if (this.historyMap.has(hash)) {
            removeHash.push(hash);
          }
          break;
        }
        case 'add': {
          addEvent.push(t.events);
          break;
        }
        default: {
          console.error('Unhandled "DrawTransport" event', t);
          break;
        }
      }
    });
    removeHash.forEach(hash => {
      const event = this.popHistory(hash);
      if (event) {
        this.addHistoryRedo([event]);
      }
    });
    addEvent.forEach(event => this.pushHistory(event));
    if (removeHash.length) {
      const events = [getClearEvent(), ...this.history, ...addEvent];
      this.broadcast$$.next(broadcastDrawEventsMapper(events));
    } else {
      this.broadcast$$.next(broadcastDrawEventsMapper(addEvent, true));
    }
    this.emitHistory();
  }

  emit(event: DrawEvent) {
    event = this.setDrawEventOwner(event);
    this.pushHistory(event);
    this.emit$$.next([{ action: 'add', events: event }]);
    this.emitHistory();
  }

  undo() {
    const event = this.popHistory();
    if (event) {
      this.addHistoryRedo([event]);
      this.broadcast$$.next({
        animate: false,
        events: [getClearEvent(), ...this.history]
      });
      this.emit$$.next([{ action: 'remove', events: event }]);
      this.emitHistory();
    }
  }

  redo() {
    if (this.historyRedo.length) {
      // Simply identify the event and let the `pushHistory` method do its job...
      // In other words, do NOT execute something like: `this.historyRedo.shift()`
      const events = this.historyRedo[0];
      events.forEach(event => this.pushHistory(event));
      this.broadcast$$.next(broadcastDrawEventsMapper(events, true));
      events.forEach(event => this.emit$$.next([{ action: 'add', events: event }]));
      this.emitHistory();
    }
  }

  cut(events: DrawEvent[]) {
    const removed = events.filter(event => this.pullHistory(event));
    if (removed.length) {
      this.addHistoryRedo(removed);
      this.broadcast$$.next({
        animate: false,
        events: [getClearEvent(), ...this.history]
      });
      this.emit$$.next(removed.map(event => ({ action: 'remove', events: event } as DrawTransport)));
      this.emitHistory();
    }
  }

  clear() {
    this.cut(this.getOwnerDrawEvents(this.history).reverse());
  }

  redraw(animate = true) {
    const events = [getClearEvent(), ...this.history];
    this.broadcast$$.next(broadcastDrawEventsMapper(events, animate));
  }

  cutRange(data: CutRangeArg) {
    const range = normalizeCutRange(data);
    this.cutRange$$.next(range);
    return range;
  }
}
