import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateHistoryDto } from "../dto/create-history.dto";
import { TrackHistoryController } from "../controllers/track_history.controllers";

export class TrackHistoryRoutes {
    public router: Router;
    private trackHistoryController: TrackHistoryController;

    constructor() {
        this.trackHistoryController = new TrackHistoryController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(
            "/",
            validateDto(CreateHistoryDto),
            this.trackHistoryController.createHistory,
        );
        this.router.get("/", this.trackHistoryController.getHistory);
    }
}
