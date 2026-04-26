import { Router } from "express";
import { uploadArtistImage } from "../middlewares/upload.middleware";
import { ArtistsController } from "../controllers/artists.controller";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

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
            authMiddleware,
            uploadArtistImage.single("photo"),
            validateDto(CreateArtistDto),
            this.artistsController.createArtist,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.artistsController.getArtists,
        );
        this.router.get("/:id", this.artistsController.getArtistById);
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.artistsController.publishArtist,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.artistsController.deleteArtist,
        );
    }
}
