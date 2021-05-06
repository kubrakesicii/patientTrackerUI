import { TestBed } from '@angular/core/testing';

import { DoctorPostService } from './doctor-post.service';

describe('DoctorPostService', () => {
  let service: DoctorPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
