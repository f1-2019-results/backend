import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Race } from './Race';

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('string')
    name: string;

    @OneToMany(type => Race, race => race.game)
    races: Race[];

    constructor() {

    }

}
