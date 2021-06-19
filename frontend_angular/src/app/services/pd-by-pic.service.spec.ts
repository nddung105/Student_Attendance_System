import { TestBed } from '@angular/core/testing';

import { PdByPicService } from './pd-by-pic.service';

describe('PdByPicService', () => {
  let service: PdByPicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdByPicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
