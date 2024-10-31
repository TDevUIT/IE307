import { Test, TestingModule } from '@nestjs/testing';
import { MinitestService } from './minitest.service';

describe('MinitestService', () => {
  let service: MinitestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinitestService],
    }).compile();

    service = module.get<MinitestService>(MinitestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
