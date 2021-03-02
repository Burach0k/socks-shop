import { TestBed } from '@angular/core/testing';

import { SockCreatorService } from './sock-creator.service';

describe('SockCreatorService', () => {
  let service: SockCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SockCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
