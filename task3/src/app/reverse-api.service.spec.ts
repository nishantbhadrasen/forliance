import { TestBed } from '@angular/core/testing';

import { ReverseApiService } from './reverse-api.service';

describe('ReverseApiService', () => {
  let service: ReverseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
