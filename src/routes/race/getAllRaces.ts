import { Request, Response } from 'express';

import asyncRequestHandler from 'util/asyncRequestHandler';
import db from 'db';

export default asyncRequestHandler(async (req: Request, res: Response) => {
    console.log('asd')
    const races = await db.races.find({
        relations: ['track']
    });
    console.log(races)
    return res.json(races);
});
