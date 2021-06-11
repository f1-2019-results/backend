import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Race from './Race';
import RaceLap from './RaceLap';
import User from './User';

@Entity()
export default class RaceResult {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    driverName: string;
    @Column({ type: 'boolean' })
    isAi: boolean;
    @Column({ type: 'boolean', default: false })
    dnf: boolean;
    @Column('integer')
    startPosition: number;
    @Column('integer')
    position: number;
    @Column('integer')
    points: number;
    @Column()
    teamName: string;

    @ManyToOne(() => Race, race => race.results)
    race?: Race;
    @ManyToOne(() => User)
    user?: User;
    @OneToMany(() => RaceLap, lap => lap.raceResult, { cascade: ['insert', 'remove'] })
    laps?: Array<RaceLap>;

    constructor(data?: Partial<RaceResult>) {
        if (data) {
            Object.assign(this, data);
        }
    }

}
