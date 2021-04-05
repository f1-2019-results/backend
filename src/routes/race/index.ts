import express from 'express';
import newRace from './newRace';
import getRace from './getRace';
import getAllRaces from './getAllRaces';

const raceRouter = express.Router();
raceRouter.post('/', newRace);
raceRouter.get('/', getAllRaces);
raceRouter.get('/:id', getRace);

export default raceRouter;