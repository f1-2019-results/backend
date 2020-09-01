import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './Track';
import { Game } from './Game';
import { RaceResult } from './RaceResult';

@Entity()
export class Race {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'uuid', nullable: false })
    uid: string;
    @Column('date')
    startTime: Date;

    @ManyToOne(() => Track, track => track.races)
    track: Track;
    @ManyToOne(() => Game, game => game.races)
    game: Game;
    @OneToMany(() => RaceResult, result => result.race)
    results: RaceResult[];

    constructor(data?: {
        startTime: Date,
    }) {
        if (data) {
            this.uid = uuidv4();
            this.startTime = data.startTime;
        }
    }

}