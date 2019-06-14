import { Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';

import { CwTabComponent } from '../cw-tab/cw-tab.component';

@Component({
  selector: 'cw-tabs',
  templateUrl: './cw-tabs.component.html',
  styleUrls: ['./cw-tabs.component.scss']
})
export class CwTabsComponent {

  @ContentChildren(CwTabComponent) tabs: QueryList<CwTabComponent>;

  content: TemplateRef<any>;

  open(tab: CwTabComponent) {
    this.openTab(tab);
    this.updateActiveTab();
  }

  private openTab(tab: CwTabComponent) {
    if (this.content === tab.content) {
      this.content = null;
    } else if (tab.content) {
      this.content = tab.content;
    }
    tab.activeChange.emit(!tab.content || this.content === tab.content);
  }

  private updateActiveTab() {
    this.tabs.forEach(tab => tab.active = tab.content === this.content);
  }
}
