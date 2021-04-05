import { Request, Response } from 'express';

import asyncRequestHandler from 'util/asyncRequestHandler';
import db from 'db';

export default asyncRequestHandler(async (req: Request, res: Response) => {
    const races = await db.races.find({
        relations: ['track']
    });
    return res.json(races);
});
