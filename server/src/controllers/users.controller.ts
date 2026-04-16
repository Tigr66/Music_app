import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { IUser } from "../interfaces/user.interface";

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const newUser: Omit<IUser, "id"> = {
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

            const user: Omit<IUser, "id"> = {
                username: username.trim(),
                password: password.trim(),
            };

            const result = await this.usersService.login(user);

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };
}
