import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { AlbumsController } from "../controllers/albums.controller";

export class UsersRoutes {
    public router: Router;
    private usersController: AlbumsController;

    constructor() {
        this.usersController = new AlbumsController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.usersController.createAlbum);
        this.router.post("/sessions", this.usersController.getAlbums);
    }
}
