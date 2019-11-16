import express from 'express';
import authRouter from './routes/auth';

const app = express();

app.use('/auth/', authRouter);
app.get('/', (req, res) => {
    res.json('Hello world');
});

export default app;
