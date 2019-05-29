import * as md5_ from 'md5';
import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { BroadcastDrawEvents, DrawEvent, DrawTransport } from './collaborative-whiteboard.model';
import { getClearEvent, mapDrawLineSerieToDrawLines } from './collaborative-whiteboard.operator';

const md5 = md5_;

@Injectable()
export class CollaborativeWhiteboardService {
  private history: DrawEvent[] = [];

  private historyMap: { [hash: string]: number; } = {};

  private historyRedo: DrawEvent[] = [];

  private history$$ = new BehaviorSubject<DrawEvent[]>([]);

  /**
   * Dispatch draw events downwards to the child components
   */
  private broadcast$$ = new Subject<BroadcastDrawEvents>();

  /**
   * Dispatch draw events upwards through the network
   */
  private emit$$ = new Subject<DrawTransport[]>();

  history$ = this.history$$.asObservable();

  broadcast$ = this.broadcast$$.asObservable();

  emit$ = this.emit$$.asObservable();

  constructor() { }

  private pushHistory(event: DrawEvent) {
    event.options = { ...event.options }; // Make this immutable!
    const hash = this.getHash(event);
    if (!(hash in this.historyMap)) {
      this.historyMap[hash] = this.history.length;
      this.history.push(event);
    }
    while (this.historyRedo.length && this.getHash(this.historyRedo.shift()) !== hash) {}
  }

  private pullHistory(event: DrawEvent): number {
    const hash = this.getHash(event);
    if (hash in this.historyMap) {
      const index = this.historyMap[hash];
      const [removed] = this.history.splice(index, 1);
      delete this.historyMap[hash];
      this.historyRedo.unshift(removed);
      return index;
    }
    return -1;
  }

  private popHistory(index?: number): DrawEvent {
    const removed = index === undefined
      ? this.history.pop()
      : this.history.splice(index, 1)[0];
    if (removed) {
      delete this.historyMap[this.getHash(removed)];
      this.historyRedo.unshift(removed);
      return removed;
    }
  }

  private getHash(event: DrawEvent) {
    // Warning: we assumes that `options.toString()` works.
    // It means that all properties (like `event.options.strokeStyle`) are primitive values...
    const options = Object.keys(event.options).sort().map(key => event.options[key]);
    return md5(event.type + options.toString() + event.data.toString());
  }

  private emitHistory() {
    // Making the emitted values immutable has an advantage!
    //
    // For more details, see the `CanvasCutComponent` that consumes the `history$`
    // observable and still uses the `ChangeDetectionStrategy.OnPush`.
    //
    //    <app-canvas-cut [history]="whiteboard.history$ | async"></app-canvas-cut>
    //
    this.history$$.next([...this.history]);
  }

  broadcast(transport: DrawTransport[]) {
    const removeIndex: number[] = [];
    const addEvent: DrawEvent[] = [];
    transport.forEach(t => {
      if (t.event.type === 'clear') {
        // FIXME: Hack
        // The clear event data should be: `[undefined, undefined, undefined, undefined]`.
        // But after it was stringified in the wire it becomes: `[null, null, null, null]`.
        // Thus, we must restore the real clear event data structure,
        // otherwise the method `CanvasComponent.drawClear` will not work properly...
        t.event = getClearEvent();
      }
      switch (t.action) {
        case 'remove': {
          const hash = this.getHash(t.event);
          if (hash in this.historyMap) {
            removeIndex.push(this.historyMap[hash]);
          }
          break;
        }
        case 'add': {
          addEvent.push(t.event);
          break;
        }
        default: {
          console.error('Unhandled "DrawTransport" event', t);
          break;
        }
      }
    });
    // We must sort the events to remove by index DESC
    removeIndex.sort().reverse().forEach(index => this.popHistory(index));
    addEvent.forEach(event => this.pushHistory(event));
    this.broadcast$$.next(removeIndex.length ? {
      animate: false,
      events: [getClearEvent(), ...this.history, ...addEvent]
    } : {
      animate: true,
      events: mapDrawLineSerieToDrawLines(addEvent)
    });
    this.emitHistory();
  }

  emit(event: DrawEvent) {
    this.pushHistory(event);
    this.emit$$.next([{ action: 'add', event }]);
    this.emitHistory();
  }

  undo(index?: number) {
    const event = this.popHistory(index);
    if (event) {
      this.broadcast$$.next({
        animate: false,
        events: [getClearEvent(), ...this.history]
      });
      this.emit$$.next([{ action: 'remove', event }]);
      this.emitHistory();
    }
  }

  redo() {
    if (this.historyRedo.length) {
      // Simply identify the event and let the `pushHistory` method do its job...
      const event = this.historyRedo[0];
      this.pushHistory(event);
      this.broadcast$$.next({
        animate: true,
        events: mapDrawLineSerieToDrawLines([event])
      });
      this.emit$$.next([{ action: 'add', event }]);
      this.emitHistory();
    }
  }

  cut(fromIndex: number, toIndex = fromIndex) {
    const removed: DrawEvent[] = [];
    for (let i = toIndex; i >= fromIndex; i--) { // We must sort the events to remove by index DESC
      const event = this.popHistory(i);
      if (event) {
        removed.push(event);
      }
    }
    if (removed.length) {
      this.broadcast$$.next({
        animate: false,
        events: [getClearEvent(), ...this.history]
      });
      this.emit$$.next(removed.map(event => ({ action: 'remove', event } as DrawTransport)));
      this.emitHistory();
    }
  }

  clear() {
    const event = getClearEvent();
    this.pushHistory(event);
    this.broadcast$$.next({
      animate: false,
      events: [getClearEvent()]
    });
    this.emit$$.next([{ action: 'add', event }]);
    this.emitHistory();
  }

  redraw(animate = true) {
    this.broadcast$$.next({
      animate,
      events: [getClearEvent(), ...mapDrawLineSerieToDrawLines(this.history)]
    });
  }
}
