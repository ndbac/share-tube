import { Repository } from 'typeorm';
import { UserRecord } from './user.entity';

export class UserRepository extends Repository<UserRecord> {}
