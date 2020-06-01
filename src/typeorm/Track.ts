import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Race } from './Race';

@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid')
    uid: string;

    @Column('string')
    name: string;

    @OneToMany(type => Race, race => race.track)
    races: Race[];


    constructor() {
        this.uid = uuidv4();
    }

}
