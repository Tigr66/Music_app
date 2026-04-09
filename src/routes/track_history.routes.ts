import { Router } from "express";
import { TracksController } from "../controllers/tracks.controller";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateHistoryDto } from "../dto/create-history.dto";

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
            validateDto(CreateHistoryDto),
            this.trackHistoryController.createTrack,
        );
    }
}
