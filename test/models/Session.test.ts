import request from 'supertest';
import * as Session from '../../src/models/Session';
import * as User from '../../src/models/User';
import { expect } from '../_index';

describe('Session', () => {

    let userId = 0;
    beforeEach(async () => {
        const user = await User.create({
            username: 'test',
            hashType: 'bcrypt',
            email: 'asd',
            passwordHash: 'asd',

        });
        userId = user.id;
    })

    describe('createOne', () => {
        it('returns session with valid arguments', async () => {
            const session = await Session.create({
                userId,
                createdAt: new Date(),
                expiresAt: new Date(),
            });
            session.should.haveOwnProperty('id')
                .which.is.a('string');
        });
    });


});