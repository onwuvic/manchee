import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}

  async create(userId, transaction): Promise<Profile> {
    return await this.profileRepository.create<Profile>(
      { userId },
      { transaction },
    );
  }
}
