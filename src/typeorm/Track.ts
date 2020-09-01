import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Race } from './Race';

@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'uuid', nullable: false })
    uid: string;
    @Column({ type: 'string', nullable: false })
    name: string;

    @OneToMany(() => Race, race => race.track)
    races: Race[];

    constructor(data?: { name: string }) {
        if (data) {
            this.uid = uuidv4();
            this.name = data.name;
        }
    }

}
