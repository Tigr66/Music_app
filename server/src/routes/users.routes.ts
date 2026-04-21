import { Router } from "express";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersController } from "../controllers/users.controller";

export class UsersRoutes {
    public router: Router;
    private usersController: UsersController;

    constructor() {
        this.usersController = new UsersController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            validateDto(CreateUserDto),
            this.usersController.registerUser,
        );
        this.router.post(
            "/sessions",
            validateDto(CreateUserDto),
            this.usersController.loginUser,
        );
    }
}
