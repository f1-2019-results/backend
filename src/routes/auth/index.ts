import express from 'express';
import joi from 'joi';
import bcrypt from 'bcrypt';
import * as User from '../../models/User';
import registerUser from './register';

const authRouter = express.Router();
authRouter.post('/register', registerUser);

export default authRouter;