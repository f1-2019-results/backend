import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../../src/app';
import login from '../../../src/routes/auth/login';
import * as User from '../../../src/models/User';
import { expect } from '../../_index';

describe('login action', () => {

    const username = 'username';
    const password = 'hunter2';
    const passwordHash = bcrypt.hashSync(password, 4);
    const exampleUser = () => ({
        createdAt: new Date(),
        email: 'asd@asd.com',
        hashType: 'bcrypt',
        passwordHash: passwordHash,
        uid: 'e1755d95-144b-4f3a-a467-59540dedfa4f',
        username: username,
    });

    beforeEach(async () => {
        await User.create(exampleUser());
    })

    it('returns session with valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username,
                password,
            })
            .expect(200);

        const session = res.body.data.session;
        expect(session).to.exist;
        session.should.haveOwnProperty('id');
        session.should.haveOwnProperty('expiresAt');
    });

    it('fails with HTTP 403 with incorrect username', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username: 'JokuUser',
                password,
            })
            .expect(403);
    });

    it('fails with HTTP 403 with incorrect password', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username,
                password: 'hunter3',
            })
            .expect(403);
    });

});