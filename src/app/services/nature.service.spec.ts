import { TestBed } from '@angular/core/testing';

import { NatureService } from './nature.service';

describe('NatureService', () => {
  let service: NatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
