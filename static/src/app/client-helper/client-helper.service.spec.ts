import { TestBed } from '@angular/core/testing';

import { ClientHelperService } from './client-helper.service';

describe('ClientHelperService', () => {
  let service: ClientHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
