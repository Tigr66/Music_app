import { Router } from "express";
import { TrackController } from "../controllers/track.controller";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateTrackDto } from "../dto/create-track.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { optionalAuthMiddleware } from "../middlewares/optional-auth.middleware";

export class TrackRoutes {
    public router: Router;
    private trackController: TrackController;

    constructor() {
        this.trackController = new TrackController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            authMiddleware,
            validateDto(CreateTrackDto),
            this.trackController.createTrack,
        );
        this.router.get(
            "/",
            optionalAuthMiddleware,
            this.trackController.getTracks,
        );
        this.router.post(
            "/:id/publish",
            authMiddleware,
            this.trackController.publishTrack,
        );
        this.router.delete(
            "/:id",
            authMiddleware,
            this.trackController.deleteTrack,
        );
    }
}
