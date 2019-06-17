import { Subscription } from 'rxjs';

import {
    AfterViewInit, Component, ContentChildren, EmbeddedViewRef, OnDestroy, QueryList, ViewChild,
    ViewContainerRef
} from '@angular/core';

import { CwTabComponent } from '../cw-tab/cw-tab.component';

@Component({
  selector: 'cw-tabs',
  templateUrl: './cw-tabs.component.html',
  styleUrls: ['./cw-tabs.component.scss']
})
export class CwTabsComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(CwTabComponent) tabs: QueryList<CwTabComponent>;

  @ViewChild('portal', { static: false, read: ViewContainerRef }) portal: ViewContainerRef;

  private activeTabs = new Map<CwTabComponent, EmbeddedViewRef<any>>();

  private activeChangeSubscriptions: Subscription[] = [];
  private tabsChangeSubscription: Subscription;

  constructor() {}

  ngAfterViewInit() {
    this.subscribeToActiveChange();
    this.subscribeToTabsChange();
  }

  ngOnDestroy() {
    this.unsubscribeFromActiveChange();
    this.unsubscribeFromTabsChange();
  }

  private subscribeToActiveChange() {
    this.activeChangeSubscriptions = [];
    this.tabs.forEach(tab => {
      const subscription = tab.activeChange.subscribe(() => this.checkContent(tab));
      this.activeChangeSubscriptions.push(subscription);
      this.checkContent(tab);
    });
  }

  private unsubscribeFromActiveChange() {
    this.activeChangeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeToTabsChange() {
    this.tabsChangeSubscription = this.tabs.changes.subscribe(() => {
      this.checkActiveTabs();
      this.unsubscribeFromActiveChange();
      this.subscribeToActiveChange();
    });
  }

  private unsubscribeFromTabsChange() {
    this.tabsChangeSubscription.unsubscribe();
  }

  private checkContent(tab: CwTabComponent) {
    if (tab.content) {
      if (tab.active && !this.activeTabs.has(tab)) {
        this.openContent(tab);
      } else if (!tab.active && this.activeTabs.has(tab)) {
        this.closeContent(tab);
      }
    }
  }

  private checkActiveTabs() {
    const tabs = this.tabs.toArray();
    for (const tab of this.activeTabs.keys()) {
      if (tabs.indexOf(tab) === -1) {
        this.closeContent(tab);
      }
    }
  }

  private openContent(tab: CwTabComponent) {
    this.activeTabs.set(tab, this.portal.createEmbeddedView(tab.content));
  }

  private closeContent(tab: CwTabComponent) {
    this.activeTabs.get(tab).destroy();
    this.activeTabs.delete(tab);
  }

  toggleActive(tab: CwTabComponent) {
    if (tab.content) {
      tab.active = !tab.active;
      tab.activeChange.emit(tab.active);
    } else {
      tab.activeChange.emit(true);
    }
  }
}
