import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { AlbumsController } from "../controllers/albums.controller";
import { CreateUserDto } from "../dto/create-user.dto";

export class UsersRoutes {
    public router: Router;
    private usersController: AlbumsController;

    constructor() {
        this.usersController = new AlbumsController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            validateDto(CreateUserDto),
            this.usersController.createAlbum,
        );
        this.router.post(
            "/sessions",
            validateDto(CreateUserDto),
            this.usersController.getAlbums,
        );
    }
}
