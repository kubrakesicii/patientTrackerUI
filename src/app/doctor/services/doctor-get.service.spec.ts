import { TestBed } from '@angular/core/testing';

import { DoctorGetService } from './doctor-get.service';

describe('DoctorGetService', () => {
  let service: DoctorGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
