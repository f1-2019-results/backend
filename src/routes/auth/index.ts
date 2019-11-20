import express from 'express';
import joi from 'joi';
import bcrypt from 'bcrypt';
import * as User from '../../models/User';
import registerUser from './register';
import loginUser from './login';

const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

export default authRouter;