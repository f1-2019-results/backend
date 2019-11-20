import express from 'express';
import joi from 'joi';
import bcrypt from 'bcrypt';
import * as User from '../models/User';

const authRouter = express.Router();

interface RegisterBody {
    username: string;
    password: string;
}

const registerReqValidator = joi.object().keys({
    username: joi.string(),
    // TODO: Config
    password: joi.string().min(6),
}).strict().options({ abortEarly: false, presence: 'required', });

authRouter.post('/register', async (req, res, next) => {
    const { value, error } = joi.validate(req.body, registerReqValidator);
    if (error)
        return next(new Error(error.message));
    const body = value as RegisterBody;

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser)
        return next(new Error(`Username already in use`));
    const user = await User.create({
        username: body.username,
        email: 'test',
        passwordHash: await bcrypt.hash(body.password, 10),
        hashType: 'bcrypt',
    });
    delete user.passwordHash;
    delete user.hashType;
    res.json(user);
});

authRouter.post('/login', (req, res) => {

});

export default authRouter;