import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasMirrorComponent } from './canvas-mirror.component';

describe('CanvasMirrorComponent', () => {
  let component: CanvasMirrorComponent;
  let fixture: ComponentFixture<CanvasMirrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasMirrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasMirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
