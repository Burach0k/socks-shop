import { Test, TestingModule } from '@nestjs/testing';
import { ClientHelperService } from './client-helper.service';

describe('ClientHelperService', () => {
  let service: ClientHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientHelperService],
    }).compile();

    service = module.get<ClientHelperService>(ClientHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
