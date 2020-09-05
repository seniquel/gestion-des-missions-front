import { TestBed } from '@angular/core/testing';

import { LigneDeFraisService } from './ligne-de-frais.service';

describe('LigneDeFraisService', () => {
  let service: LigneDeFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneDeFraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
