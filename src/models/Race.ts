import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Track from './Track';
import Game from './Game';
import RaceResult from './RaceResult';

@Entity()
export default class Race {

    @PrimaryGeneratedColumn()
    id: number;
    @Column('uuid')
    uid: string;
    @Column('date')
    startTime: Date;

    @ManyToOne(() => Track, track => track.races)
    track?: Track;
    @ManyToOne(() => Game, game => game.races)
    game?: Game;
    @OneToMany(() => RaceResult, result => result.race, { cascade: ['insert', 'remove'] })
    results?: RaceResult[];

    constructor(data?: Partial<Race>) {
        if (data) {
            Object.assign(this, data);
            this.uid = uuidv4();
        }
    }

}
