import request from 'supertest';
import config from '../../../src/config';
import app from '../../../src/app';

describe('register action', () => {

    it('returns OK with valid data', async () => {
        await register({
            username: 'MattiMinä',
            password: 'teasdkjdsa'
        })
            .expect(200);
    });

    it('returns session with valid data', async () => {
        const res = await register({
            username: 'MattiMinä',
            password: 'teasdkjdsa'
        })
            .expect(200);
        const session = res.body.data.shouldHaveOwnProperty('session') as object;
        session.should.haveOwnProperty('id');
        session.should.haveOwnProperty('expiresAt');
        const user = res.body.data.shouldHaveOwnPropert('user') as object;
        user.should.haveOwnProperty('uid');
    });

    it('returns HTTP 400 with too short username', async () => {
        await register({
            username: 'a'.repeat(config.user.minUsernameLength - 1),
            password: 'strongPassword',
        })
            .expect(400);
    });

    it('returns HTTP 400 with too short password', async () => {
        await register({
            username: 'ValidUsername',
            password: 'a'.repeat(config.user.minPasswordLength - 1),
        })
            .expect(400);
    });

    function register(data) {
        return request(app)
            .post('/api/auth/register')
            .send(data);
    }

});