import request from 'supertest';
import config from '../../../src/config';
import app from '../../../src/app';

describe('register action', () => {

    const validPassword = 'a'.repeat(config.user.minPasswordLength);

    it('returns OK with valid data', async () => {
        await register({
            username: 'MattiMinä',
            password: validPassword
        })
            .expect(200);
    });

    it('returns session and user with valid data', async () => {
        const res = await register({
            username: 'MattiMinä',
            password: validPassword
        })
            .expect(200);
        res.body.should.haveOwnProperty('data');
        const data = res.body.data;
        data.should.haveOwnProperty('session');
        data.session.should.haveOwnProperty('id');
        data.session.should.haveOwnProperty('expiresAt');
        data.should.haveOwnProperty('user');
        data.user.should.haveOwnProperty('uid');
    });

    it('returns HTTP 400 with too short username', async () => {
        await register({
            username: 'a'.repeat(config.user.minUsernameLength - 1),
            password: validPassword,
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

    it('returns HTTP 422 when username is already in use', async () => {
        await register({
            username: 'ValidUsername',
            password: validPassword,
        });
        await register({
            username: 'ValidUsername',
            password: validPassword,
        })
            .expect(422);
    });

    function register(data) {
        return request(app)
            .post('/auth/register')
            .send(data);
    }

});