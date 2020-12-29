import request from 'supertest';
import app from 'app';
import { expect } from '../../_index';

describe('new race route', () => {

    const testRaceData = () => ({
        startTime: new Date(),
        trackId: '0',
        game: 'F1 2019',
        results: [
            {
                driverName: 'Max Verstappen',
                isAi: true,
                position: 1,
                points: 25,
                laps: [
                    {
                        sectors: [20, 30, 35],
                        position: 1,
                        invalid: false,
                    },
                    {
                        sectors: [20, 30.2, 35.1],
                        position: 1,
                        invalid: false,
                    }
                ]
            },
            {
                driverName: 'Lewis Hamilton',
                isAi: true,
                position: 2,
                points: 18,
                laps: [
                    {
                        sectors: [20, 30, 35],
                        position: 2,
                        invalid: false,
                    },
                    {
                        sectors: [20, 30.3, 35.2],
                        position: 2,
                        invalid: false,
                    }
                ]
            }
        ]
    });

    it.only('creates race with valid payload', async () => {
        await request(app)
            .post('/race/')
            .send(testRaceData())
            .expect(200);
    });


});