import { NextFunction, Response } from "express";
import { TrackHistoryService } from "../services/track-history.service";
import { AuthRequest } from "../types/auth.types";

export class TrackHistoryController {
    private trackHistoryService: TrackHistoryService;

    constructor() {
        this.trackHistoryService = new TrackHistoryService();
    }

    createHistory = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { trackId } = req.body;
            const user = req.user!;

            const result = await this.trackHistoryService.create({
                trackId,
                userId: user.id,
            });

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getHistory = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = req.user!;

            const result = await this.trackHistoryService.get(user.id);

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };
}
