import { Router } from "express";
import { uploadArtistImage } from "../middlewares/upload.middleware";
import { ArtistController } from "../controllers/artist.controller";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

export class ArtistRoutes {
    public router: Router;
    private artistController: ArtistController;

    constructor() {
        this.artistController = new ArtistController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            authMiddleware,
            uploadArtistImage.single("photo"),
            validateDto(CreateArtistDto),
            this.artistController.createArtist,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.artistController.getArtists,
        );
        this.router.get(
            "/:id",
            optionalAuthMiddleware,
            this.artistController.getArtistById,
        );
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.artistController.publishArtist,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.artistController.deleteArtist,
        );
    }
}
