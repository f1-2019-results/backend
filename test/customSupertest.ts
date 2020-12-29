import supertest from 'supertest';
import status from 'statuses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(supertest as any).Test.prototype.expect = function (
    this: supertest.Test,
    statusCode: number
) {
    this.then((res) => {
        if (res.status !== statusCode) {
            const message = `expected ${statusCode} "${status(statusCode)}", got ${res.status} "${status(res.status)}" response: ${JSON.stringify(res.body, null, 2)}`;
            throw message;
        }
    });
    return this;
};
