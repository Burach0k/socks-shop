import { TestBed } from '@angular/core/testing';

import { DashboadrService } from './dashboadr.service';

describe('DashboadrService', () => {
  let service: DashboadrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboadrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
