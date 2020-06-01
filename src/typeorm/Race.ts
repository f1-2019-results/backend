import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Track } from "./Track";
import { Game } from './Game';

@Entity()
export class Race {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'uuid', nullable: false })
    uid: string;
    @Column('date')
    startTime: Date;

    @ManyToOne(type => Track, track => track.races)
    track: Track;
    @ManyToOne(type => Game, game => game.races)
    game: Track;

    constructor() {
        this.uid = uuidv4();
    }

}
