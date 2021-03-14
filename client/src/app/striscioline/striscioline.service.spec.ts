import { TestBed } from '@angular/core/testing';

import { StrisciolineService } from './striscioline.service';

describe('StrisciolineService', () => {
  let service: StrisciolineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrisciolineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
