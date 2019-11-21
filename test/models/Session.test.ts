import * as Session from '../../src/models/Session';
import * as User from '../../src/models/User';
import { expect } from '../_index';

describe('Session', () => {

    let userId = 0;
    beforeEach(async () => {
        const user = await User.create({
            username: 'test',
            email: 'asd',
            passwordHash: 'asd',
        });
        userId = user.id;
    })

    const exampleSession = () => ({
        userId,
        createdAt: new Date(),
        expiresAt: new Date(),
    });

    describe('createOne', () => {

        it('returns session with valid arguments', async () => {
            await Session.create(exampleSession())
                .should.eventually.haveOwnProperty('id')
                .which.is.a('string');
        });
    });

    describe('findOne', () => {
        it('returns correct session', async () => {
            const session = await Session.create(exampleSession());
            await Session.findOne(session.id)
                .should.eventually.eql(session);
        });
    });

    describe('deleteOne', () => {
        it('deletes correct session', async () => {
            const session = await Session.create(exampleSession());
            await Session.removeOne(session.id);
            await Session.findOne(session.id)
                .should.eventually.be.undefined;
        });

        it('returns false if session with given key does not exist', async () => {
            await Session.removeOne('keyDoesNotExist')
                .should.eventually.be.false;
        });

        it('returns true if session to delete exists', async () => {
            const session = await Session.create(exampleSession());
            await Session.removeOne(session.id)
                .should.eventually.be.true;
        });
    });

});
