import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [SequelizeModule.forFeature([Profile])],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
