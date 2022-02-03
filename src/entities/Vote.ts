import {Entity as TypeEntity, Column, Index, BeforeInsert, OneToMany, ManyToOne, JoinColumn} from "typeorm";

import Comment from './Comment';
import Entity from './Entity';
import Post from './Post';
import User from './User'
@TypeEntity('votes')
export default class Vote extends Entity{
  constructor(vote: Partial<Vote>) {
    super()
    Object.assign(this, vote)
  }

  @Column()
  value: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username'} )
  user: User

  @Column()
  username: string

  @ManyToOne(() => Post)
  post: Post

  @ManyToOne(() => Comment)
  comment: Comment
}