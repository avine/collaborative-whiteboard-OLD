import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBasicComponent } from './canvas-basic.component';

describe('CanvasBasicComponent', () => {
  let component: CanvasBasicComponent;
  let fixture: ComponentFixture<CanvasBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
