import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '../base';
import { UserModel } from '../database';
import { transaction } from 'objection';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  public async createWithGraph<T = any>(data: T): Promise<any> {
    Logger.log('UserRepository.createWithGraph');

    return await transaction(UserModel, async (Model) => {
      return Model.query().insertGraphAndFetch(data, { allowRefs: true });
    });
  }
}
