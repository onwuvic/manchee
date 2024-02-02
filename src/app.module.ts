import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import mailConfig from 'core/mail/mail.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { FriendsModule } from './modules/friends/friends.module';
import configuration from 'core/config/configuration';

import databaseConfig from 'core/database/database.config';
import { DatabaseModule } from 'core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, mailConfig, configuration],
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
