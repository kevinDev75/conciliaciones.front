import { TestBed, inject } from '@angular/core/testing';

import { CuponeraService } from './cuponera.service';

describe('CuponeraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuponeraService]
    });
  });

  it('should be created', inject([CuponeraService], (service: CuponeraService) => {
    expect(service).toBeTruthy();
  }));
});
