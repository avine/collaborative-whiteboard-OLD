import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwWhiteboardComponent } from './cw-whiteboard.component';

describe('CwWhiteboardComponent', () => {
  let component: CwWhiteboardComponent;
  let fixture: ComponentFixture<CwWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CwWhiteboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
