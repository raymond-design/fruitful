import { IsEmail, Length } from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt';
import { instanceToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity{
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    //@Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
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

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hash() {
       this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON() {
        return instanceToPlain(this);
    }
    
}
