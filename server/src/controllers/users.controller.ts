import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { IUser } from "../interfaces/user.interface";
import { AuthRequest } from "../types/auth.types";

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const newUser = {
                username: username.trim(),
                password: password.trim(),
            };

            const result = await this.usersService.register(newUser);

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

            const result = await this.usersService.login(user);

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
            await this.usersService.logout(user.id);

            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            next(err);
        }
    };
}
