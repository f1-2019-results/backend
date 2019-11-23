import * as Race from '../../src/models/Race';
import * as User from '../../src/models/User';
import { expect } from '../_index';

describe('Race', () => {

    let userId = 0;
    beforeEach(async () => {
        const user = await User.create({
            username: 'test',
            email: 'asd',
            passwordHash: 'asd',
        });
        userId = user.id;
    })

    it('does not throw with valid data', async () => {
        await Race.create({
            game: 'F1 2019',
            startTime: new Date(),
            trackId: 1,
            results: [
                {
                    driver: {
                        isAi: false,
                        name: 'FINDarkside',
                    },
                    points: 25,
                    position: 1,
                    laps: [
                        {
                            invalid: false,
                            sector1: 20,
                            sector2: 20,
                            sector3: 20,
                        }
                    ]
                }
            ]
        });
    });

});
