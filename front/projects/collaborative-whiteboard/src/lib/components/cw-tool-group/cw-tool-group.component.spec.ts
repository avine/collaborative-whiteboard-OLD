import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwToolGroupComponent } from './cw-tool-group.component';

describe('CwToolGroupComponent', () => {
  let component: CwToolGroupComponent;
  let fixture: ComponentFixture<CwToolGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwToolGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwToolGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
