import { Test, TestingModule } from '@nestjs/testing';
import { SockViewController } from './sock-view.controller';

describe('SockViewController', () => {
  let controller: SockViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SockViewController],
    }).compile();

    controller = module.get<SockViewController>(SockViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
