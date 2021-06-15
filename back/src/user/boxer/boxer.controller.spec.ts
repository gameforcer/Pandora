import { Test, TestingModule } from '@nestjs/testing';
import { BoxerController } from './boxer.controller';

describe('BoxerController', () => {
  let controller: BoxerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxerController],
    }).compile();

    controller = module.get<BoxerController>(BoxerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
