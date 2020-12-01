import { Module } from '@nestjs/common';
import { SendGridModule } from "@anchan828/nest-sendgrid";
import { MailService } from './mail.service';

@Module({
    imports: [
        SendGridModule.forRoot({
          apikey: process.env.SENDGRID_API_KEY,
        }),
      ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
