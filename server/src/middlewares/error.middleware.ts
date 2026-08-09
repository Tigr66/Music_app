import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export class ErrorMiddleware {
    static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({
                error: err.message,
            });
            return;
        }

        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}
