import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Session from './Session';

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('uuid')
    uid: string;
    @Column()
    username: string;
    @Column()
    email: string;
    // passwordHash will not be seleccted by default, to avoid accidentally leaking it
    @Column({ select: false })
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
