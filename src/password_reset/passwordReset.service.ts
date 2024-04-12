import { Inject, Injectable } from '@nestjs/common';
import { CreatePasswordResetDto, UpdatePasswordResetDto } from './dto';
import { PasswordResetRepository } from './passwordReset.repository';

@Injectable()
export class PasswordResetService {
  @Inject(PasswordResetRepository)
  private readonly passwordResetRepo: PasswordResetRepository;

  public async create(data: CreatePasswordResetDto) {
    return await this.passwordResetRepo.create(data);
  }

  public async findById(id: string) {
    return this.passwordResetRepo.findById(id);
  }

  public async findAll(data?: any) {
    return this.passwordResetRepo.findAll(data);
  }

  public async findOne(data: UpdatePasswordResetDto) {
    return this.passwordResetRepo.findOne(data);
  }

  public async findMany(data: UpdatePasswordResetDto) {
    return this.passwordResetRepo.findMany(data);
  }

  public async update(id: string, data: UpdatePasswordResetDto) {
    return this.passwordResetRepo.update(id, data);
  }

  public async delete(id: string) {
    return this.passwordResetRepo.delete(id);
  }
}
