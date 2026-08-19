import { Router } from "express";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateUserDto } from "../dto/create-user.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { LoginUserDto } from "../dto/login-user.dto";
import { AuthController } from "../controllers/auth.controller";
import { loginLimiter, registerLimiter } from "../config/rate-limit";

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/register",
            registerLimiter,
            validateDto(CreateUserDto),
            this.authController.registerUser,
        );
        this.router.post(
            "/login",
            loginLimiter,
            validateDto(LoginUserDto),
            this.authController.loginUser,
        );
        this.router.post("/logout", this.authController.logoutUser);
        this.router.post(
            "/refresh",
            authMiddleware,
            this.authController.refreshAccessToken,
        );
    }
}
