import { IsEmail, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
class User extends BaseEntity {
  constructor(user: Partial<User>) {
    // partial means that some fields can be nullable
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Length(3, 255, {
    message: 'username most have a least 3 characters long',
    always: true,
  })
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(7, 255, {
    message: 'password most have a least 6 characters long',
    always: true,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return classToPlain(this);
  }
}

export default User;
