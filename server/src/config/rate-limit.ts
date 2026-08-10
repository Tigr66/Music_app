import { rateLimit } from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 5,
    handler: (_, res) => {
        res.status(429).json({
            statusCode: 429,
            message: "Too many login attempts. Please try again later",
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 час
    max: 5,
    handler: (_, res) => {
        res.status(429).json({
            statusCode: 429,
            message: "Too many registration attempts. Please try again later",
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
