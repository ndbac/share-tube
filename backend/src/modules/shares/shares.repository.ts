import { Repository } from 'typeorm';
import { ShareRecord } from './shares.entity';

export class ShareRepository extends Repository<ShareRecord> {}
