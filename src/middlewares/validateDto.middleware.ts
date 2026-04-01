import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output = plainToInstance(dtoClass, req.body ?? {}, {
            enableImplicitConversion: true,
        });
        const errors = await validate(output);

        if (errors.length > 0) {
            const message = errors
                .map((error) =>
                    error.constraints ? Object.values(error.constraints) : [],
                )
                .flat()
                .join(", ");
            return res.status(400).json({ error: message });
        }

        req.body = output;
        next();
    };
};
