import joi from 'joi';
import bcrypt from 'bcrypt';
import * as User from '../../models/User';
import * as Session from '../../models/Session';
import config from '../../config';
import { ValidationError } from '../../errors';

interface RegisterBody {
    username: string;
    password: string;
}

const registerReqValidator = joi.object().keys({
    username: joi.string().min(config.user.minUsernameLength),
    password: joi.string().min(config.user.minPasswordLength),
}).strict().options({ abortEarly: false, presence: 'required', });

export default async function registerUser(req, res, next) {
    const { value, error } = joi.validate(req.body, registerReqValidator);
    if (error)
        return next(new ValidationError(error.message));
    const body = value as RegisterBody;

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser)
        return next(new Error(`Username already in use`));
    const user = await User.create({
        username: body.username,
        email: 'test',
        passwordHash: await bcrypt.hash(body.password, config.bcryptWorkFactor),
        hashType: 'bcrypt',
    });
    delete user.passwordHash;
    delete user.hashType;

    const session = await Session.create({
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + config.defaultSessionLength),
        userId: user.id,
    });
    res.json({
        data: {
            user,
            session
        }
    });
};
