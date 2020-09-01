import { Request, Response, NextFunction } from 'express';

type WrappedRequestHandler = (req: Request, res: Response, next: NextFunction) => unknown;

export default function asyncRequestHandlerWrapper(fn: (req: Request, res: Response) => unknown): WrappedRequestHandler;
export default function asyncRequestHandlerWrapper(fn: (req: Request, res: Response, next: NextFunction) => unknown): WrappedRequestHandler;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function asyncRequestHandlerWrapper(fn) {
    if (fn.length === 2) {
        return (req: Request, res: Response, next: NextFunction): void => {
            Promise.resolve(fn(req, res))
                .then(() => next())
                .catch((err) => next(err));
        };
    } else if (fn.length === 3) {
        return (req: Request, res: Response, next: NextFunction): void => {
            Promise.resolve(fn(req, res, next))
                .catch((err) => next(err));
        };
    }
    throw new Error(`Expected fn to have 2 or 3 arguments but it has ${fn.length}`);
}
