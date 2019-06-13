import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwToolsComponent } from './cw-tools.component';

describe('CwToolsComponent', () => {
  let component: CwToolsComponent;
  let fixture: ComponentFixture<CwToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
