import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Race from './Race';
import User from './User';

@Entity()
export default class RaceResult {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    driverName: string;
    @Column({ type: 'boolean' })
    isAi: boolean;
    @Column('integer')
    position: number;
    @Column('integer')
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
