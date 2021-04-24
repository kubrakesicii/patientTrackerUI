import { TestBed } from '@angular/core/testing';

import { AdminCountService } from './admin-count.service';

describe('AdminCountService', () => {
  let service: AdminCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
