
export function errorHandler(error, request, response, next) {
    if (process.env.NODE_ENV !== 'test')
        console.error(error.message);
    return response.status(500).send({ error: error.message });
}
