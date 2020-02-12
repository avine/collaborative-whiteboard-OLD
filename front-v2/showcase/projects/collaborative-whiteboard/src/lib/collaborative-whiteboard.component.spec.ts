import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborativeWhiteboardComponent } from './collaborative-whiteboard.component';

describe('CollaborativeWhiteboardComponent', () => {
  let component: CollaborativeWhiteboardComponent;
  let fixture: ComponentFixture<CollaborativeWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborativeWhiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborativeWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
