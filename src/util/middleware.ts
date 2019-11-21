import { ValidationError, AuthenticationError } from '../errors';

export function errorHandler(error, request, response, next) {
    if (process.env.NODE_ENV !== 'test')
        console.error(error.message);
    if (!error)
        return response.status(500);
    if (error instanceof ValidationError)
        return response.status(400).send({ error: error.message });
    else if (error instanceof AuthenticationError)
        return response.status(403).send({ error: error.message });

    return response.status(500).send({ error: error.message });
}
