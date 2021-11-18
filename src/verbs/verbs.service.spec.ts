import { Test, TestingModule } from '@nestjs/testing';
import { VerbsService } from './verbs.service';

describe('VerbsService', () => {
  let service: VerbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerbsService],
    }).compile();

    service = module.get<VerbsService>(VerbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
