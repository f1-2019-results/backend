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

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.id)
    user?: User;

    constructor(data?: Partial<Session>) {
        if (data) {
            Object.assign(this, data);
            if (!this.id)
                this.id = uuidv4();
        }
    }

}
