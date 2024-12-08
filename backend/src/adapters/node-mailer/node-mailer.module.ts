import { Module } from '@nestjs/common';
import { nodemailerProvider, NodemailerService } from './node-mailer.provider';

@Module({
  providers: [nodemailerProvider, NodemailerService],
  exports: [nodemailerProvider, NodemailerService],
})
export class NodeMailerModule {}
