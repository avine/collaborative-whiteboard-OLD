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

  activeTab: CwTabComponent;

  ngAfterContentInit() {
    this.tabs.forEach(tab => {
      if (tab.active) {
        this.toggleActiveTab(tab);
      }
    });
    this.initTabs();
  }

  initTabs() {
    this.tabs.forEach(tab => {
      tab.activeChange.subscribe(active => {
        if (tab.content) {
          if (tab.active && tab !== this.activeTab || !tab.active && tab === this.activeTab) {
            this.toggleActiveTab(tab);
          }
        }
      });
    });
  }

  toggle(tab: CwTabComponent) {
    const prevTab = this.activeTab;

    this.toggleActiveTab(tab);
    this.updateActiveTab();

    if (this.activeTab && prevTab && this.activeTab !== prevTab) {
      this.tabs.forEach(t => {
        if (t === prevTab) {
          t.activeChange.emit(false);
        }
      });
    }

    this.emitActiveTab(tab);
  }

  private toggleActiveTab(tab: CwTabComponent) {
    if (this.activeTab === tab) {
      this.activeTab = null;
    } else if (tab.content) {
      this.activeTab = tab;
    }
  }

  private updateActiveTab() {
    this.tabs.forEach(tab => tab.active = this.activeTab === tab);
  }

  private emitActiveTab(tab: CwTabComponent) {
    tab.activeChange.emit(!tab.content || this.activeTab === tab);
  }
}
