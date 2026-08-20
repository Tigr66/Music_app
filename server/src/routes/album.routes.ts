import { Router } from "express";
import { uploadAlbumImage } from "../middlewares/upload.middleware";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { AlbumsController } from "../controllers/album.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

export class AlbumsRoutes {
    public router: Router;
    private albumsController: AlbumsController;

    constructor() {
        this.albumsController = new AlbumsController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            authMiddleware,
            uploadAlbumImage.single("cover"),
            validateDto(CreateAlbumDto),
            this.albumsController.createAlbum,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.albumsController.getAlbums,
        );
        this.router.get(
            "/:id",
            optionalAuthMiddleware,
            this.albumsController.getAlbumById,
        );
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.albumsController.publishAlbum,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.albumsController.deleteAlbum,
        );
    }
}
