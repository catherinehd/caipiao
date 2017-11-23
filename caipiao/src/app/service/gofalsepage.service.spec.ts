import { TestBed, inject } from '@angular/core/testing';

import { GofalsepageService } from './gofalsepage.service';

describe('GofalsepageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GofalsepageService]
    });
  });

  it('should be created', inject([GofalsepageService], (service: GofalsepageService) => {
    expect(service).toBeTruthy();
  }));
});
