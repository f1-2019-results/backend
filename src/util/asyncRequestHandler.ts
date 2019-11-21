import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

type WrappedRequestHandler = (req: Request, res: Response, next: NextFunction) => any;

export default function asyncRequestHandlerWrapper(fn: (req: Request, res: Response) => any): WrappedRequestHandler;
export default function asyncRequestHandlerWrapper(fn: (req: Request, res: Response, next: NextFunction) => any): WrappedRequestHandler;
export default function asyncRequestHandlerWrapper(fn) {
    if (fn.length === 2) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res))
                .then(() => next())
                .catch((err) => next(err));
        };
    } else if (fn.length === 3) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next))
                .catch((err) => next(err));
        }
    }
    throw new Error(`Expected fn to have 2 or 3 arguments but it has ${fn.length}`);
}
