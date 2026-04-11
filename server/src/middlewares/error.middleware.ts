import { Request, Response, NextFunction } from "express";

export class ErrorMiddleware {
    static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err);

        res.status(500).json({
            error: err.message,
        });
    }
}
