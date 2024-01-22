import { Injectable } from '@nestjs/common';
// import { SendGridService } from "@anchan828/nest-sendgrid";
import { MailerService } from '@nestjs-modules/mailer';
import { mailMessage } from './messages/mail.messages';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async emailVerification(email, firstName, url): Promise<void> {
    await this.mailerService.sendMail({
      to: `${email}`,
      from: 'Manchee <noreply@manchee.com>',
      subject: 'Email Verification',
      template: './verification-message',
      context: {
        firstName,
        url,
      },
    });
  }

  async resetPasswordMail(email, firstName, url): Promise<void> {
    await this.mailerService.sendMail({
      to: `${email}`,
      from: 'Manchee <noreply@manchee.com>',
      subject: 'Password Reset',
      text: mailMessage.resetPasswordMessageText(firstName, url),
      html: mailMessage.resetPasswordMessageHtml(firstName, url),
    });
  }
}
