import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwToolboxComponent } from './cw-toolbox.component';

describe('ToolboxComponent', () => {
  let component: CwToolboxComponent;
  let fixture: ComponentFixture<CwToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
