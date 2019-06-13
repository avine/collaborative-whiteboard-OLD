import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCanvasComponent } from './cw-canvas.component';

describe('CwCanvasComponent', () => {
  let component: CwCanvasComponent;
  let fixture: ComponentFixture<CwCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
