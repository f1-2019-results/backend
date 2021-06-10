import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import Race from './Race';
import RaceResult from './RaceResult';

@Entity()
export default class RaceLap {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('integer')
    lapnum: number;
    @Column('integer')
    position: number;
    @Column('double precision', { array: true })
    sectors: number[];
    @Column('double precision', { nullable: true })
    laptime: number | null = null;
    @Column('boolean')
    invalid: boolean;

    @ManyToOne(() => RaceResult, raceResult => raceResult.laps)
    raceResult?: Race;

    constructor(data?: Partial<RaceLap>) {
        if (data) {
            Object.assign(this, data);
            this.calculateLapTime();
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    /**
     * TODO: Could this be done in db?
     */
    calculateLapTime(): void {
        if (this.sectors.length && this.sectors.every(v => v !== null)) {
            this.laptime = this.sectors.reduce((prev, acc) => prev + acc);
        } else {
            this.laptime = null;
        }
    }

}
