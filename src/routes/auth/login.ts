import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as User from '../../models/User';
import * as Session from '../../models/Session';
import config from '../../config';
import asyncRequestHandler from '../../util/asyncRequestHandler';

interface LoginBody {
    username: string;
    password: string;
}

const loginBodyValidator = joi.object().keys({
    username: joi.string(),
    password: joi.string(),
}).strict().options({ abortEarly: false, presence: 'required', });

export default asyncRequestHandler(async (req: Request, res: Response) => {
    const { value, error } = joi.validate(req.body, loginBodyValidator);
    if (error)
        throw new Error(error.message);
    const body = value as LoginBody;

    const user = await User.findOne({ username: body.username });
    if (!user)
        return res.status(403).json({ error: 'User does not exist' });
    // TODO: read user.hashType
    if (!await bcrypt.compare(body.password, user.passwordHash))
        return res.status(403).json({ error: 'Incorrect password' });

    const session = await Session.create({
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + config.defaultSessionLength),
        userId: user.id,
    });
    res.json({
        data: {
            session,
        }
    });
});
