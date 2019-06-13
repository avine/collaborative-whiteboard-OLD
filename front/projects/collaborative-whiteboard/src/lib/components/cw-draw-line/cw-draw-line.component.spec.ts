import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwDrawLineComponent } from './cw-draw-line.component';

describe('CwDrawLineComponent', () => {
  let component: CwDrawLineComponent;
  let fixture: ComponentFixture<CwDrawLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwDrawLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwDrawLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
