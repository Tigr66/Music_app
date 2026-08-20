import { Router } from "express";
import { uploadAlbumImage } from "../middlewares/upload.middleware";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { AlbumController } from "../controllers/album.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

export class AlbumRoutes {
    public router: Router;
    private albumController: AlbumController;

    constructor() {
        this.albumController = new AlbumController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            authMiddleware,
            uploadAlbumImage.single("cover"),
            validateDto(CreateAlbumDto),
            this.albumController.createAlbum,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.albumController.getAlbums,
        );
        this.router.get(
            "/:id",
            optionalAuthMiddleware,
            this.albumController.getAlbumById,
        );
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.albumController.publishAlbum,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.albumController.deleteAlbum,
        );
    }
}
