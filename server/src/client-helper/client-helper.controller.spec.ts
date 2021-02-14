import { Test, TestingModule } from '@nestjs/testing';
import { ClientHelperController } from './client-helper.controller';

describe('ClientHelperController', () => {
  let controller: ClientHelperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientHelperController],
    }).compile();

    controller = module.get<ClientHelperController>(ClientHelperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
