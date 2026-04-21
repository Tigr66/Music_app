import { Router } from "express";
import { uploadAlbumImage } from "../middlewares/upload.middleware";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { AlbumsController } from "../controllers/albums.controller";

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
            uploadAlbumImage.single("cover"),
            validateDto(CreateAlbumDto),
            this.albumsController.createAlbum,
        );
        this.router.get("/", this.albumsController.getAlbums);
        this.router.get("/:id", this.albumsController.getAlbumById);
    }
}
