import { TestBed } from '@angular/core/testing';

import { CollaborativeWhiteboardService } from './collaborative-whiteboard.service';

describe('CollaborativeWhiteboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaborativeWhiteboardService = TestBed.get(CollaborativeWhiteboardService);
    expect(service).toBeTruthy();
  });
});
