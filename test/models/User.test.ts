import * as User from '../../src/models/User';
import { expect } from '../_index';

describe('User', () => {
    const exampleUser = () => ({
        createdAt: new Date(),
        email: 'asd@asd.com',
        passwordHash: 'asdasd',
        uid: 'e1755d95-144b-4f3a-a467-59540dedfa4f',
        username: 'Matti',
    });

    describe('createOne', () => {

        it('returns user which has id', async () => {
            await User.create(exampleUser())
                .should.eventually.haveOwnProperty('id')
                .which.is.a('number');
        });
    });

    describe('findOne', () => {

        it('returns correct user', async () => {
            const user = await User.create(exampleUser());
            await User.findOne({ id: user.id })
                .should.eventually.eql(user);
        });

    });

});