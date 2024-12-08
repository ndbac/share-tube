import { Inject, Injectable } from '@nestjs/common';
import config from 'config';
import * as nodemailer from 'nodemailer';

export const NODEMAILER_PROVIDER = 'geoterry-be-nodemailer';

export const nodemailerProvider = {
  provide: NODEMAILER_PROVIDER,
  useFactory: () => {
    const transporter = nodemailer.createTransport({
      host: config.get<string>('nodemailer.host'),
      port: config.get<number>('nodemailer.port'),
      secure: config.get<boolean>('nodemailer.secure'),
      auth: {
        user: config.get<string>('nodemailer.auth.user'),
        pass: config.get<string>('nodemailer.auth.pass'),
      },
    });
    return transporter;
  },
};

@Injectable()
export class NodemailerService {
  constructor(
    @Inject(NODEMAILER_PROVIDER)
    private readonly transporter: nodemailer.Transporter,
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: config.get<string>('nodemailer.from'),
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
