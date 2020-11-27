import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DEVELOPMENT, TEST, PRODUCTION } from './core/constants';
import { databaseConfig } from './core/database/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
// import { models } from './core/database/models';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { FriendsModule } from './modules/friends/friends.module';
import { MailModule } from './core/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        let config;
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = databaseConfig.development;
            break;
          case TEST:
            config = databaseConfig.test;
            break;
          case PRODUCTION:
            config = databaseConfig.production;
            break;
          default:
            config = databaseConfig.development;
        }
        return { 
          ...config,
          autoLoadModels: true,
          // synchronize: true,
          // models: [...models]
        }
      },
    }),
    UsersModule,
    AuthModule,
    ProfilesModule,
    FriendsModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
