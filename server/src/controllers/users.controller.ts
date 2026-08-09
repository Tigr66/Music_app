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

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    logoutUser = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = req.user!;
            await this.authService.logout(user.id);

            res.clearCookie("refresh_token");
            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            next(err);
        }
    };
}
