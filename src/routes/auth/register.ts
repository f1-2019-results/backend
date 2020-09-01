import joi from 'joi';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import Session from '../../models/Session';
import config from '../../config';
import { ValidationError } from '../../errors';
import asyncRequestHandler from '../../util/asyncRequestHandler';
import { Request, Response } from 'express';
import db from '../../db';

interface RegisterBody {
    username: string;
    password: string;
}

const registerReqValidator = joi.object().keys({
    username: joi.string().min(config.user.minUsernameLength),
    password: joi.string().min(config.user.minPasswordLength),
}).strict().options({ abortEarly: false, presence: 'required', });

export default asyncRequestHandler(async (req: Request, res: Response) => {
    const { value, error } = joi.validate(req.body, registerReqValidator);
    if (error)
        throw new ValidationError(error.message);
    const body = value as RegisterBody;

    const existingUser = await db.users.findOne({ username: body.username });
    if (existingUser)
        throw new Error('Username already in use');
    const user = await db.users.save(new User({
        username: body.username,
        email: 'test',
        passwordHash: await bcrypt.hash(body.password, config.bcryptWorkFactor),
    }));
    delete user.passwordHash;

    const session = await db.sessions.save(new Session({
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + config.defaultSessionLength),
        userId: user.id,
    }));
    res.json({
        data: {
            user,
            session
        }
    });
});
