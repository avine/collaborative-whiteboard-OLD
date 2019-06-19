import { Subscription } from 'rxjs';

import {
    AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ContentChildren, OnDestroy,
    QueryList, ViewChild, ViewContainerRef, Input
} from '@angular/core';

import { CwToolContentComponent } from '../cw-tool-content/cw-tool-content.component';
import { CwToolComponent } from '../cw-tool/cw-tool.component';

@Component({
  selector: 'cw-tool-group',
  templateUrl: './cw-tool-group.component.html',
  styleUrls: ['./cw-tool-group.component.scss']
})
export class CwToolGroupComponent implements AfterViewInit, OnDestroy {
  @Input() layoutVertical = false;

  @ContentChildren(CwToolComponent) tools: QueryList<CwToolComponent>;

  @ViewChild('portal', { static: false, read: ViewContainerRef }) portal: ViewContainerRef;

  private activeTools = new Map<CwToolComponent, ComponentRef<CwToolContentComponent>>();

  private activeChangeSubscriptions: Subscription[] = [];
  private toolsChangeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    this.subscribeToActiveChange();
    this.subscribeToToolsChange();
  }

  ngOnDestroy() {
    this.unsubscribeFromActiveChange();
    this.unsubscribeFromToolsChange();
  }

  private subscribeToActiveChange() {
    this.activeChangeSubscriptions = [];
    this.tools.forEach(tool => {
      const subscription = tool.activeChange.subscribe(() => this.checkContent(tool));
      this.activeChangeSubscriptions.push(subscription);
      this.checkContent(tool);
    });
  }

  private unsubscribeFromActiveChange() {
    this.activeChangeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeToToolsChange() {
    this.toolsChangeSubscription = this.tools.changes.subscribe(() => {
      this.checkactiveTools();
      this.unsubscribeFromActiveChange();
      this.subscribeToActiveChange();
    });
  }

  private unsubscribeFromToolsChange() {
    this.toolsChangeSubscription.unsubscribe();
  }

  private checkContent(tool: CwToolComponent) {
    if (tool.content) {
      if (tool.active && !this.activeTools.has(tool)) {
        this.openContent(tool);
      } else if (!tool.active && this.activeTools.has(tool)) {
        this.closeContent(tool);
      }
    }
  }

  private checkactiveTools() {
    const tools = this.tools.toArray();
    for (const tool of this.activeTools.keys()) {
      if (tools.indexOf(tool) === -1) {
        this.closeContent(tool);
      }
    }
  }

  private openContent(tool: CwToolComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CwToolContentComponent);
    const componentRef = this.portal.createComponent(componentFactory);
    componentRef.instance.title = tool.title;
    componentRef.instance.content = tool.content;
    this.activeTools.set(tool, componentRef);
  }

  private closeContent(tool: CwToolComponent) {
    this.activeTools.get(tool).destroy();
    this.activeTools.delete(tool);
  }

  toggleActive(tool: CwToolComponent) {
    if (tool.content || tool.noContentSwitchMode) {
      tool.active = !tool.active;
      tool.activeChange.emit(tool.active);
    } else {
      tool.activeChange.emit(true);
    }
  }
}
