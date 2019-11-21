import express from 'express';
import authRouter from './routes/auth';
import bodyParser from 'body-parser';
import { errorHandler } from './util/middleware';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.json('Hello world');
});
app.use(errorHandler);

export default app;
