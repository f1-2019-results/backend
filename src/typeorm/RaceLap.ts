import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Race } from './Race';
import { User } from './User';

@Entity()
export class RaceResult {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('number')
    lapnum: number;
    @Column('double precision', { array: true })
    sectors: number[];
    @Column('double precision', { nullable: true })
    laptime: number | null = null;
    @Column('boolean')
    invalid: boolean;

    @ManyToOne(() => Race, race => race.results)
    race?: Race;
    @ManyToOne(() => User, { nullable: true })
    user?: User | null;


    constructor(data?: RaceResult) {
        if (data) {
            Object.assign(this, data);
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    setLaptime(): void {
        if (this.sectors.every(v => v !== null)) {
            this.laptime = this.sectors.reduce((prev, acc) => prev + acc);
        } else {
            this.laptime = null;
        }
    }

}
