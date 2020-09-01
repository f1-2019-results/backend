import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Game } from './Game';
import { Race } from './Race';
import { User } from './User';

@Entity()
export class RaceResult {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'string' })
    driverName: string;
    @Column({ type: 'boolean' })
    isAi: boolean;
    @Column('number')
    position: number;
    @Column('number')
    points: number;

    @ManyToOne(() => Race, race => race.results)
    race?: Race;
    @ManyToOne(() => User)
    user?: User;


    constructor(data?: RaceResult) {
        if (data) {
            Object.assign(this, data);
        }
    }

}
