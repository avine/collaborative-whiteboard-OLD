import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { CdkDrag } from '@angular/cdk/drag-drop';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { CwToolContentComponent } from '../cw-tool-content/cw-tool-content.component';
import { CwToolComponent } from '../cw-tool/cw-tool.component';

@Component({
  selector: 'cw-tool-group',
  templateUrl: './cw-tool-group.component.html',
  styleUrls: ['./cw-tool-group.component.scss'],
})
export class CwToolGroupComponent implements AfterViewInit, OnDestroy {
  @Input() layoutVertical = false;

  @Input() dragBoundarySelector: string;

  @ContentChildren(CwToolComponent) tools: QueryList<CwToolComponent>;

  @ViewChild('portal', { static: false, read: ViewContainerRef })
  portal: ViewContainerRef;

  private activeTools = new Map<CwToolComponent, OverlayRef>();

  private activeChangeSubscriptions: Subscription[] = [];
  private toolsChangeSubscription: Subscription;

  collapse = false;

  constructor(private overlay: Overlay) {}

  ngAfterViewInit() {
    this.subscribeToActiveChange();
    this.subscribeToToolsChange();
  }

  ngOnDestroy() {
    this.unsubscribeFromActiveChange();
    this.unsubscribeFromToolsChange();
    this.closeAllContent();
  }

  private subscribeToActiveChange() {
    this.activeChangeSubscriptions = [];
    this.tools.forEach(tool => {
      const subscription = tool.activeChange.subscribe(() =>
        this.checkContent(tool),
      );
      this.activeChangeSubscriptions.push(subscription);
      this.checkContent(tool);
    });
  }

  private unsubscribeFromActiveChange() {
    this.activeChangeSubscriptions.forEach(subscription =>
      subscription.unsubscribe(),
    );
  }

  private subscribeToToolsChange() {
    this.toolsChangeSubscription = this.tools.changes.subscribe(() => {
      this.checkActiveTools();
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

  private checkActiveTools() {
    const tools = this.tools.toArray();
    for (const tool of this.activeTools.keys()) {
      if (tools.indexOf(tool) === -1) {
        this.closeContent(tool);
      }
    }
  }

  private openContent(tool: CwToolComponent) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayRef = this.overlay.create({ positionStrategy });
    const componentRef = overlayRef.attach(
      new ComponentPortal(CwToolContentComponent),
    );
    componentRef.instance.title = tool.title;
    componentRef.instance.content = tool.content;
    componentRef.instance.dispose
      .pipe(first())
      .subscribe(() => this.toggleActive(tool));
    this.activeTools.set(tool, overlayRef);
  }

  private closeContent(tool: CwToolComponent) {
    this.activeTools.get(tool).dispose();
    this.activeTools.delete(tool);
  }

  private closeAllContent() {
    const tools = this.tools.toArray();
    for (const tool of this.activeTools.keys()) {
      this.closeContent(tool);
    }
  }

  toggleActive(tool: CwToolComponent) {
    if (tool.content || tool.noContentSwitchMode) {
      tool.active = !tool.active;
      tool.activeChange.emit(tool.active);
    } else {
      tool.activeChange.emit(true);
    }
  }

  /**
   * Because the tool group is resizable, we need to clean the cached dimensions of the preview element.
   */
  cleanCachedDimensions({ source }: { source: CdkDrag }) {
    // HACK: https://stackoverflow.com/questions/55098093/angular-cdk-drag-and-drop-boundary
    source['_dragRef']['_previewRect'] = null; // tslint:disable-line: no-string-literal
  }
}
