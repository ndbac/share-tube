import { Repository } from 'typeorm';
import { ShareRecord } from './shares.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShareRepository extends Repository<ShareRecord> {}
