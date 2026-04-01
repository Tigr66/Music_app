import { Router } from "express";
import { uploadArtistImage } from "../middlewares/upload.middleware";
import { validateDto } from "../middlewares/validateDto.middleware";
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
            validateDto(CreateAlbumDto),
            uploadArtistImage.single("cover"),
            this.albumsController.createAlbum,
        );
        this.router.get("/", this.albumsController.getAlbums);
        this.router.get("/:id", this.albumsController.getAlbumById);
    }
}
