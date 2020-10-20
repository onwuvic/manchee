import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Friend } from './entities/friend.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Friend]),
    UsersModule
  ],
  providers: [FriendsService],
  controllers: [FriendsController]
})
export class FriendsModule {}
