import { Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../types/auth.types";

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || typeof authHeader !== "string") {
            res.status(401).json({ message: "No authorization token" });
            return;
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const user = await prisma.user.findUnique({
            where: { token: token || "" },
        });

        if (!user) {
            res.status(401).json({
                message: "Unauthorized user",
            });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Authorization failed" });
    }
};
