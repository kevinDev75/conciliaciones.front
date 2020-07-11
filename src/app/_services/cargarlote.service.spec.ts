import { TestBed, inject } from '@angular/core/testing';

import { CargarloteService } from './cargarlote.service';

describe('CargarloteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargarloteService]
    });
  });

  it('should be created', inject([CargarloteService], (service: CargarloteService) => {
    expect(service).toBeTruthy();
  }));
});
