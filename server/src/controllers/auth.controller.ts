import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const newUser = {
                username: username.trim(),
                password: password.trim(),
            };

            const result = await this.authService.register(newUser);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const user = {
                username: username.trim(),
                password: password.trim(),
            };

            const result = await this.authService.login(user);

            const { refreshToken, ...userWithoutTokens } = result;

            res.cookie("refresh_token", result.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json(userWithoutTokens);
        } catch (err) {
            next(err);
        }
    };

    logoutUser = async (
        _: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            res.clearCookie("refresh_token");
            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            next(err);
        }
    };

    refreshAccessToken = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ error: "No refresh token provided" });
            }

            const newAccessToken =
                await this.authService.refreshAccessToken(refreshToken);

            res.status(200).json({ accessToken: newAccessToken });
        } catch (err) {
            next(err);
        }
    };
}
