import {
    AfterContentInit, Component, ContentChildren, QueryList, TemplateRef
} from '@angular/core';

import { CwTabComponent } from '../cw-tab/cw-tab.component';

@Component({
  selector: 'cw-tabs',
  templateUrl: './cw-tabs.component.html',
  styleUrls: ['./cw-tabs.component.scss']
})
export class CwTabsComponent implements AfterContentInit {

  @ContentChildren(CwTabComponent) tabs: QueryList<CwTabComponent>;

  content: TemplateRef<any>;

  ngAfterContentInit() {
    this.tabs.forEach(tab => {
      if (tab.active) {
        this.toggleTab(tab);
      }
    });
    this.initTabs();
  }

  initTabs() {
    this.tabs.forEach(tab => {
      tab.activeChange.subscribe(active => {
        if (tab.content) {
          if (tab.active && tab.content !== this.content || !tab.active && tab.content === this.content) {
            this.toggleTab(tab);
          }
        }
      });
    });
  }

  toggle(tab: CwTabComponent) {
    const prevContent = this.content;

    this.toggleTab(tab);
    this.updateActiveTab();

    if (this.content && prevContent && this.content !== prevContent) {
      this.tabs.forEach(t => {
        if (t.content === prevContent) {
          t.activeChange.emit(false);
        }
      });
    }

    this.emitActiveTab(tab);
  }

  private toggleTab(tab: CwTabComponent) {
    if (this.content === tab.content) {
      this.content = null;
    } else if (tab.content) {
      this.content = tab.content;
    }
  }

  private updateActiveTab() {
    this.tabs.forEach(tab => tab.active = tab.content === this.content);
  }

  private emitActiveTab(tab: CwTabComponent) {
    tab.activeChange.emit(!tab.content || this.content === tab.content);
  }
}
