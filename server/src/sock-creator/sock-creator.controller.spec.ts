import { Test, TestingModule } from '@nestjs/testing';
import { SockCreatorController } from './sock-creator.controller';

describe('SockCreatorController', () => {
  let controller: SockCreatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SockCreatorController],
    }).compile();

    controller = module.get<SockCreatorController>(SockCreatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
