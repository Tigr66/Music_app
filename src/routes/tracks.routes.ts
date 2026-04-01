import { Router } from "express";
import { TracksController } from "../controllers/tracks.controller";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateTrackDto } from "../dto/create-track.dto";

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
            validateDto(CreateTrackDto),
            this.tracksController.createTrack,
        );
        this.router.get("/", this.tracksController.getTracks);
    }
}
