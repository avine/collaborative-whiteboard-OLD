import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';

type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer = this.rendererFactory.createRenderer(null, null);

  private themeName: ThemeName;

  get name() {
    return this.themeName;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.setTheme();
  }

  setTheme(name: ThemeName = 'light') {
    const oldName: ThemeName = name === 'light' ? 'dark' : 'light';
    this.renderer.removeClass(this.document.body, `theme--${oldName}`);
    this.renderer.addClass(this.document.body, `theme--${name}`);
    this.themeName = name;
  }

  switchTheme() {
    this.setTheme(this.themeName === 'light' ? 'dark' : 'light');
  }
}
