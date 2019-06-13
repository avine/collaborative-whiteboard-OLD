import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Whiteboard2Component } from './whiteboard2.component';

describe('Whiteboard2Component', () => {
  let component: Whiteboard2Component;
  let fixture: ComponentFixture<Whiteboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Whiteboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Whiteboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
