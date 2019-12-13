import { TestBed } from '@angular/core/testing';

import { AvancementService } from './avancement.service';

describe('AvancementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvancementService = TestBed.get(AvancementService);
    expect(service).toBeTruthy();
  });
});
