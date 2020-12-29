import express from 'express';
import newRace from './newRace';

const raceRouter = express.Router();
raceRouter.post('/race', newRace);

export default raceRouter;