import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Race } from './Race';

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('string')
    name: string;

    @OneToMany(() => Race, race => race.game)
    races: Race[];

    constructor(data?: { name: string }) {
        if (data) {
            this.name = data.name;
        }
    }

}
