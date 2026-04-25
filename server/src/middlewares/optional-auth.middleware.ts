import { NextFunction, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../types/auth.types";

export const optionalAuthMiddleware = async (
    req: AuthRequest,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            next();
            return;
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const user = await prisma.user.findUnique({
            where: { token: token || "" },
        });

        if (user) req.user = user;

        next();
    } catch (err) {
        next();
    }
};
