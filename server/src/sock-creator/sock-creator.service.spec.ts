import { Test, TestingModule } from '@nestjs/testing';
import { SockCreatorService } from './sock-creator.service';

describe('SockCreatorService', () => {
  let service: SockCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SockCreatorService],
    }).compile();

    service = module.get<SockCreatorService>(SockCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
