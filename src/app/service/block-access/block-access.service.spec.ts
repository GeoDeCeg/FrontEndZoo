import { TestBed } from '@angular/core/testing';

import { BlockAccessService } from './block-access.service';

describe('BlockAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockAccessService = TestBed.get(BlockAccessService);
    expect(service).toBeTruthy();
  });
});
