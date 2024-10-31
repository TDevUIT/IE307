import { Test, TestingModule } from '@nestjs/testing';
import { MinitestController } from './minitest.controller';
import { MinitestService } from './minitest.service';

describe('MinitestController', () => {
  let controller: MinitestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinitestController],
      providers: [MinitestService],
    }).compile();

    controller = module.get<MinitestController>(MinitestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
