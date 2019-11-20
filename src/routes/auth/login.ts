import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as User from '../../models/User';

interface LoginBody {
    username: string;
    password: string;
}

const loginBodyValidator = joi.object().keys({
    username: joi.string(),
    password: joi.string(),
}).strict().options({ abortEarly: false, presence: 'required', });

export default async function loginUser(req: Request, res: Response, next: NextFunction) {
    const { value, error } = joi.validate(req.body, loginBodyValidator);
    if (error)
        return next(new Error(error.message));
    const body = value as LoginBody;

    const user = await User.findOne({ username: body.username });
    if (!user)
        return res.json({ error: 'User does not exist' });
    // TODO: read user.hashType
    if (!await bcrypt.compare(body.password, user.passwordHash))
        return res.json({ error: 'Incorrect password' });
    return null;
};
