import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mailSending')
export class MailQueueConsumer {
  constructor(private readonly mailService: MailerService) {}

  @Process('verification-mail')
  async sendVerificationEmail(job: Job<any>) {
    const {
      data: { email, firstName, url },
    } = job;

    await this.mailService.sendMail({
      to: `${email}`,
      from: 'Manchee <noreply@manchee.com>',
      subject: 'Email Verification',
      template: './verification-mail',
      context: {
        firstName,
        url,
      },
    });
  }

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<any>) {
    const {
      data: { email, firstName, url },
    } = job;

    await this.mailService.sendMail({
      to: `${email}`,
      from: 'Manchee <noreply@manchee.com>',
      subject: 'Reset Password',
      template: './reset-password',
      context: {
        firstName,
        url,
      },
    });
  }
}
