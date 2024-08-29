import { DataSource, Repository } from 'typeorm';
import { UserRecord } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserRecord> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRecord, dataSource.createEntityManager());
  }
}
