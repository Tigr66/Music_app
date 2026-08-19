import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { JwtService } from "../services/jwt.service";

const jwtService = new JwtService();

export const optionalAuthMiddleware = async (
    req: AuthRequest,
    _: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        const [_, token] = authHeader ? authHeader.split(" ") : [];

        const user = token ? jwtService.verifyAccessToken(token) : null;

        if (user) req.user = user;

        next();
    } catch (err) {
        next();
    }
};
