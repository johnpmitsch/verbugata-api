import { Test, TestingModule } from '@nestjs/testing';
import { VerbsController } from './verbs.controller';
import { VerbsService } from './verbs.service';

describe('VerbsController', () => {
  let controller: VerbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerbsController],
      providers: [VerbsService],
    }).compile();

    controller = module.get<VerbsController>(VerbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
