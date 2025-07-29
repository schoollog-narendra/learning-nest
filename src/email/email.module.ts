import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { getEmailConfig } from '../config/email.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const config = getEmailConfig();
        console.log('📧 Email module configuration loaded');
        return {
          transport: config,
          defaults: config.defaults,
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {} 