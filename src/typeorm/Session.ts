import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {

    @Column({ type: 'uuid', primary: true })
    id: string;

    @Column('date')
    createdAt: Date;
    @Column('date')
    expiresAt: Date;

    constructor(username: string, passwordHash: string) {
        this.id = uuidv4();
        this.createdAt = new Date();
        this.expiresAt = new Date();
    }

}
