import express from 'express';
import registerUser from './register';
import loginUser from './login';

const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

export default authRouter;