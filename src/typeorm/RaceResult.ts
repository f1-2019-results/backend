import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Game } from './Game';
import { Race } from './Race';
import { User } from './User';

@Entity()
export class RaceResult {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'string', nullable: false })
    driverName: string;
    @Column({ type: 'boolean', nullable: false })
    isAi: boolean;
    @Column('number', { nullable: false })
    position: number;
    @Column('number', { nullable: false })
    points: number;

    @ManyToOne(() => Race, race => race.results)
    race: Race;
    @ManyToOne(() => User)
    user?: User;


    constructor(data?: RaceResult) {
        if (data) {
            Object.assign(this, data);
        }
    }

}
