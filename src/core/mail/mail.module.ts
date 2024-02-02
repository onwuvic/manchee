import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SendGridModule } from "@anchan828/nest-sendgrid";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { QueueModule } from 'core/queue/queue.module';

import { MailQueueConsumer } from './consumers/mail.consumers';

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
    QueueModule,
  ],
  providers: [MailQueueConsumer],
  exports: [QueueModule],
})
export class MailModule {}
