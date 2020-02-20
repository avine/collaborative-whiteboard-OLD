import { createContext } from 'react';
import { ReplaySubject } from 'rxjs';

class DraggableOnTop {
  private id$$ = new ReplaySubject<number>();

  id$ = this.id$$.asObservable();

  setId(id: number) {
    this.id$$.next(id);
  }
}

export const getDraggableOnTop = () => new DraggableOnTop();

const DraggableOnTopContext = createContext<DraggableOnTop>(
  getDraggableOnTop()
);

export default DraggableOnTopContext;

let id = 0;

export const getNewId = () => {
  id += 1;
  return id;
};
