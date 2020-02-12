import { TestBed } from '@angular/core/testing';

import { CollaborativeWhiteboardService } from './collaborative-whiteboard.service';

describe('CollaborativeWhiteboardService', () => {
  let service: CollaborativeWhiteboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaborativeWhiteboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
