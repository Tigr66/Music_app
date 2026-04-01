import { Router } from "express";
import { uploadArtistImage } from "../middlewares/upload.middleware";
import { ArtistsController } from "../controllers/artists.controller";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateArtistDto } from "../dto/create-artist.dto";

export class ArtistsRoutes {
    public router: Router;
    private artistsController: ArtistsController;

    constructor() {
        this.artistsController = new ArtistsController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            validateDto(CreateArtistDto),
            uploadArtistImage.single("photo"),
            this.artistsController.createArtist,
        );
        this.router.get("/", this.artistsController.getArtists);
    }
}
