import request from 'supertest';
import app from 'app';
import testRaceData from './testRaceData';
import { expect } from '../../_index';

describe('new race route', () => {

    let uid = '';
    beforeEach(async () => {
        // FIXME: Should use models directly...
        const res = await request(app)
            .post('/race/')
            .send(testRaceData());
        uid = res.body.uid;
    });

    it('can get race by id', async () => {
        const res = await request(app)
            .get('/race/' + uid)
            .expect(200);
    });

});