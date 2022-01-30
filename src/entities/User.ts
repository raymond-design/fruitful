import { IsEmail, Length } from 'class-validator';
import {Entity as TypeEntity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import Entity from './Entity';
import Post from './Post';

@TypeEntity('users')
export default class User extends Entity{
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    @Index()
    @IsEmail(undefined, { message: 'Must be a valid email address'})
    @Length(1, 255, {message: 'Email cannot be empty!'})
    @Column({unique: true})
    email: string;

    @Index()
    @Length(5, 16, {message: 'Username must be between 5 and 16 characters'})
    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    @Length(8, 24, {message: 'Password must be between 8 and 24 characters'})
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async hash() {
       this.password = await bcrypt.hash(this.password, 10);
    }
}
