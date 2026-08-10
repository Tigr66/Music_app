import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import { JwtService } from "../services/jwt.service";

const jwtService = new JwtService();

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ error: "No authorization token" });
            return;
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            res.status(401).json({ error: "Invalid authorization format" });
            return;
        }

        const user = jwtService.verifyAccessToken(token);

        if (!user) {
            res.status(401).json({ error: "Invalid authorization token" });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Authorization failed" });
    }
};
