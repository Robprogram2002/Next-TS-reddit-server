import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

export default abstract class ShareEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
