import { Router } from "express";
import { TracksController } from "../controllers/tracks.controller";

export class TracksRoutes {
    public router: Router;
    private tracksController: TracksController;

    constructor() {
        this.tracksController = new TracksController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.tracksController.createTrack);
        this.router.get("/", this.tracksController.getTracks);
    }
}
