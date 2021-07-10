import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Length } from 'class-validator';
import ShareEntity from './ShareEntity';
import User from './User';
import slugify from '../utils/slugify';
import makeId from '../utils/characterId';
import Sub from './Sub';

@Entity('posts')
export default class Post extends ShareEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column({ unique: true })
  identifier: string; // 7 Character Id

  @Column()
  @Length(3, 255, {
    message: "post's title must have at leats 3 characters long",
  })
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
