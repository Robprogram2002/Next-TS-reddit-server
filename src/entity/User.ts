import { IsEmail, Length } from 'class-validator';
import { Entity, Column, Index, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import ShareEntity from './ShareEntity';
import Post from './Post';
import Vote from './Vote';

@Entity('users')
class User extends ShareEntity {
  constructor(user: Partial<User>) {
    // partial means that some fields can be nullable
    super();
    Object.assign(this, user);
  }

  @Index()
  @Length(3, 255, {
    message: 'username most have a least 3 characters long',
    always: true,
  })
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(7, 255, {
    message: 'password most have a least 6 characters long',
    always: true,
  })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}

export default User;
