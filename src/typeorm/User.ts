import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('uuid')
    uid: string;
    @Column({ type: 'string', nullable: false })
    username: string;
    @Column('string')
    email: string;
    @Column({ type: 'string', nullable: false })
    passwordHash: string;


    constructor(username: string, passwordHash: string) {
        this.uid = uuidv4();
        this.username = username;
        this.passwordHash = passwordHash;
    }

}
