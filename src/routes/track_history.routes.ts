import { Router } from "express";
import { TracksController } from "../controllers/tracks.controller";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateTrackDto } from "../dto/create-track.dto";

export class TrackHistoryRoutes {
    public router: Router;
    private trackHistoryController: TracksController;

    constructor() {
        this.trackHistoryController = new TracksController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            validateDto(CreateTrackDto),
            this.trackHistoryController.createTrack,
        );
    }
}
