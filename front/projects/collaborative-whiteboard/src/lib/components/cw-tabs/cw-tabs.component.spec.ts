import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTabsComponent } from './cw-tabs.component';

describe('CwTabsComponent', () => {
  let component: CwTabsComponent;
  let fixture: ComponentFixture<CwTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
