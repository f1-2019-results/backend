import { Request, Response } from 'express';

import asyncRequestHandler from 'util/asyncRequestHandler';
import db from 'db';

export default asyncRequestHandler(async (req: Request, res: Response) => {
    const race = await db.races.findOne({
        where: { uid: req.params.id },
        relations: ['track', 'game', 'results', 'results.laps']
    });
    if (!race)
        return res.status(404).end();
    res.json(race);
});
