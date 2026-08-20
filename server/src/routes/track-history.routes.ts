import { Router } from "express";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { CreateHistoryDto } from "../dto/create-history.dto";
import { TrackHistoryController } from "../controllers/track-history.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

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
            authMiddleware,
            validateDto(CreateHistoryDto),
            this.trackHistoryController.createHistory,
        );
        this.router.get(
            "/",
            authMiddleware,
            this.trackHistoryController.getHistory,
        );
    }
}
