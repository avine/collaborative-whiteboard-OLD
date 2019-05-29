import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDrawComponent } from './canvas-draw.component';

describe('CanvasDrawComponent', () => {
  let component: CanvasDrawComponent;
  let fixture: ComponentFixture<CanvasDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
