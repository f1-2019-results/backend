import { Entity, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

@Entity()
export default class Session {

    @Column({ type: 'uuid', primary: true })
    id: string;
    @Column('date')
    createdAt: Date;
    @Column('date')
    expiresAt: Date;

    @ManyToOne(() => User, user => user.id)
    user?: User;

    constructor(data?: { expiresAt: Date }) {
        if (data) {
            this.id = uuidv4();
            this.createdAt = new Date();
            this.expiresAt = data.expiresAt;
        }
    }

}
