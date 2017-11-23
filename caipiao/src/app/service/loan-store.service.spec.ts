import { TestBed, inject } from '@angular/core/testing';

import { LoanStoreService } from './loan-store.service';

describe('LoanStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanStoreService]
    });
  });

  it('should be created', inject([LoanStoreService], (service: LoanStoreService) => {
    expect(service).toBeTruthy();
  }));
});
