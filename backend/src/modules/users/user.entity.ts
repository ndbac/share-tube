import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShareRecord } from '../shares/shares.entity';

@Entity('users')
export class UserRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    length: 90,
  })
  name: string;

  @Column({
    name: 'email',
    length: 254,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    length: 45,
  })
  password: string;

  @Column({
    name: 'refresh_token',
  })
  refreshToken: string;

  @OneToMany(() => ShareRecord, (share) => share.user)
  shares: ShareRecord[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
