import express from 'express';
import newRace from './newRace';
import getRace from './getRace';

const raceRouter = express.Router();
raceRouter.post('/', newRace);
raceRouter.get('/:id', getRace);

export default raceRouter;