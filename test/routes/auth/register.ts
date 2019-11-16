import request from 'supertest';
import app from '../../../src/app';

describe('register', () => {

    it('works', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'MattiMinä',
                password: 'teasdkjdsa'
            })
            .expect(200);
    });

});