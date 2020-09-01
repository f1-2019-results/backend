import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Session } from './Session';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('uuid')
    uid: string;
    @Column({ type: 'string' })
    username: string;
    @Column('string')
    email: string;
    @Column({ type: 'string', select: false })
    passwordHash: string;
    @Column({ type: 'date' })
    createdAt: Date;

    @OneToMany(() => Session, session => session.user)
    sessions?: Session[];

    constructor(data?: { username: string, email: string, passwordHash: string }) {
        if (data) {
            this.uid = uuidv4();
            this.createdAt = new Date();
            this.username = data.username;
            this.passwordHash = data.passwordHash;
            this.email = data.email;
        }
    }

}
