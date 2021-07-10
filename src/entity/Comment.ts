import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import ShareEntity from './ShareEntity';
import Post from './Post';
import User from './User';

import makeId from '../utils/characterId';

@Entity('comments')
export default class Comment extends ShareEntity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(8);
  }
}
