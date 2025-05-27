import { TestBed } from '@angular/core/testing';

import { TrasnferenciasService } from './trasnferencias.service';

describe('TrasnferenciasService', () => {
  let service: TrasnferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasnferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
