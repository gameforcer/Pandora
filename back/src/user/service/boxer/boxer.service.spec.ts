import { Test, TestingModule } from '@nestjs/testing';
import { BoxerService } from './boxer.service';

describe('BoxerService', () => {
  let service: BoxerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxerService],
    }).compile();

    service = module.get<BoxerService>(BoxerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
