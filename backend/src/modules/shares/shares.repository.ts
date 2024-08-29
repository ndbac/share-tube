import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ShareRecord } from './shares.entity';

@Injectable()
export class ShareRepository extends Repository<ShareRecord> {
  constructor(private readonly dataSource: DataSource) {
    super(ShareRecord, dataSource.createEntityManager());
  }
}
