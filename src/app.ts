import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import raceRouter from './routes/race';
import bodyParser from 'body-parser';
import { errorHandler } from './util/middleware';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/race', raceRouter);
app.get('/', (req, res) => {
    res.json('Hello world');
});

app.use(errorHandler);

export default app;
