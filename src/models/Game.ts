import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Race from './Race';

@Entity()
export default class Game {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(() => Race, race => race.game)
    races?: Race[];

    constructor(data?: { name: string }) {
        if (data) {
            this.name = data.name;
        }
    }

}
