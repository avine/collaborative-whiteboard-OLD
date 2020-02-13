import { InjectionToken } from '@angular/core';

const windowFactory = (): Window | null =>
  typeof window !== 'undefined' ? window : null;

export const WINDOW = new InjectionToken<Window>('WINDOW', {
  providedIn: 'root',
  factory: windowFactory,
});
