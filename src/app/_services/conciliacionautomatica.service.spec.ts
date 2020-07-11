import { TestBed, inject } from '@angular/core/testing';

import { ConciliacionAutomaticaService } from './conciliacionautomatica.service';

describe('ConciliacionautomaticaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConciliacionAutomaticaService]
    });
  });

  it('should be created', inject([ConciliacionAutomaticaService], (service: ConciliacionAutomaticaService) => {
    expect(service).toBeTruthy();
  }));
});
