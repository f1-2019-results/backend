import request from 'supertest';
import app from 'app';
import testRaceData from './testRaceData';
import { expect } from '../../_index';

describe('new race route', () => {

    it('creates race with valid payload', async () => {
        const res = await request(app)
            .post('/race/')
            .send(testRaceData())
            .expect(200);
        console.log(res.body);
    });


});