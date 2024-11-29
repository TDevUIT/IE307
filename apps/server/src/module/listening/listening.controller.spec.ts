import { Test, TestingModule } from '@nestjs/testing';
import { ListeningController } from './listening.controller';
import { ListeningService } from './listening.service';

describe('ListeningController', () => {
  let controller: ListeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListeningController],
      providers: [ListeningService],
    }).compile();

    controller = module.get<ListeningController>(ListeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
