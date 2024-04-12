import { Test, TestingModule } from '@nestjs/testing';
import { UtilModule } from '../utils';
import { PasswordResetRepository } from './passwordReset.repository';
import { PasswordResetService } from './passwordReset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilModule],
      providers: [PasswordResetService, PasswordResetRepository],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
