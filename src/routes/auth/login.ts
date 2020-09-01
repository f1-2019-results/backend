import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import Session from '../../models/Session';
import config from '../../config';
import asyncRequestHandler from '../../util/asyncRequestHandler';
import db from '../../db';

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

    // passwordHash must be selected explicitly
    const user = await db.users.findOne({ username: body.username }, { select: ['id', 'passwordHash'] });
    if (!user)
        return res.status(403).json({ error: 'User does not exist' });
    if (!await bcrypt.compare(body.password, user.passwordHash))
        return res.status(403).json({ error: 'Incorrect password' });

    const session = await db.sessions.save(new Session({
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + config.defaultSessionLength),
        user,
    }));

    res.json({
        data: {
            session,
        }
    });
});
