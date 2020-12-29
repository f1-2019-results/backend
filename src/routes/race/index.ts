import express from 'express';
import newRace from './newRace';

const raceRouter = express.Router();
raceRouter.post('/', newRace);

export default raceRouter;