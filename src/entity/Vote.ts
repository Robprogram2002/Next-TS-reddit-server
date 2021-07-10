import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import ShareEntity from './ShareEntity';
import Post from './Post';
import User from './User';
import Comment from './Comment';

@Entity('votes')
export default class Vote extends ShareEntity {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
