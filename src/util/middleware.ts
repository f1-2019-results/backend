import { ValidationError, AuthenticationError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction): void {
    if (process.env.NODE_ENV !== 'test')
        console.error(error.message);
    if (!error)
        response.status(500);
    else if (error instanceof ValidationError)
        response.status(400).send({ error: error.message });
    else if (error instanceof AuthenticationError)
        response.status(403).send({ error: error.message });
    else
        response.status(500).send({ error: error.message });
    next();
}
