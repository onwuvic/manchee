import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

import mailConfig from 'core/mail/mail.config';
import { AuthModule } from 'modules/auth/auth.module';
import configuration from 'core/config/configuration';
import { UsersModule } from 'modules/users/users.module';
import databaseConfig from 'core/database/database.config';
import { DatabaseModule } from 'core/database/database.module';
import { FriendsModule } from 'modules/friends/friends.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, mailConfig, configuration],
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
