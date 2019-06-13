import { TestBed } from '@angular/core/testing';

import { CwService } from './cw.service';

describe('CwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CwService = TestBed.get(CwService);
    expect(service).toBeTruthy();
  });
});
