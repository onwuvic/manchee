import { registerAs } from '@nestjs/config';

export default registerAs('mailConfig', () => ({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}));
