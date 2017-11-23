import { TestBed, inject } from '@angular/core/testing';

import { InsuranceStoreService } from './insurance-store.service';

describe('InsuranceStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceStoreService]
    });
  });

  it('should be created', inject([InsuranceStoreService], (service: InsuranceStoreService) => {
    expect(service).toBeTruthy();
  }));
});
