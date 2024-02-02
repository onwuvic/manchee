import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailModule } from 'core/mail/mail.module';
import { UsersModule } from 'modules/users/users.module';
import { SecurityService } from 'core/services/security/security.service';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: configService.get('jwtExpToken') },
      }),
      inject: [ConfigService],
    }),
    MailModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
