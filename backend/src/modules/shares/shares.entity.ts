import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRecord } from '../users/user.entity';

@Entity('shares')
@Index(['user', 'youtubeId'], { unique: true })
export class ShareRecord {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    name: 'youtube_id',
  })
  youtubeId: string;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => UserRecord, (user) => user.shares)
  @JoinColumn({ name: 'user_id' })
  user: UserRecord;

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
