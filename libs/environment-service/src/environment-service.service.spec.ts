import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentServiceService } from './environment-service.service';

describe('EnvironmentServiceService', () => {
  let service: EnvironmentServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentServiceService],
    }).compile();

    service = module.get<EnvironmentServiceService>(EnvironmentServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
