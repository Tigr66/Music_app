import { Router } from "express";
import { TracksController } from "../controllers/tracks.controller";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateTrackDto } from "../dto/create-track.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

export class TracksRoutes {
    public router: Router;
    private tracksController: TracksController;

    constructor() {
        this.tracksController = new TracksController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            authMiddleware,
            validateDto(CreateTrackDto),
            this.tracksController.createTrack,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.tracksController.getTracks,
        );
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.tracksController.publishTrack,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.tracksController.deleteTrack,
        );
    }
}
