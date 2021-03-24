import { TestBed } from '@angular/core/testing';

import { SockViewService } from './sock-view.service';

describe('SockViewService', () => {
  let service: SockViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SockViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
