import { IsEmail, Min } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Index()
    @Min(5, {message: 'Username must be at least 5 characters'})
    @Column({unique: true})
    username: string;

    @Column()
    @Min(8, {message: 'Password must be at least 8 characters'})
    password: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
