import { TestBed } from '@angular/core/testing';

import { AdminGetService } from './admin-get.service';

describe('AdminGetService', () => {
  let service: AdminGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
