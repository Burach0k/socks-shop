import { Test, TestingModule } from '@nestjs/testing';
import { SockViewService } from './sock-view.service';

describe('SockViewService', () => {
  let service: SockViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SockViewService],
    }).compile();

    service = module.get<SockViewService>(SockViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
