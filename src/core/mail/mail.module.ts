import { Module } from '@nestjs/common';
// import { SendGridModule } from "@anchan828/nest-sendgrid";
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // SendGridModule.forRoot({
    //   apikey: process.env.SENDGRID_API_KEY,
    // }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('mailConfig'),
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class MailModule {}
