import { NextFunction, Request, Response } from "express";
import { ITrack } from "../interfaces/track.interface";
import { TrackHistoryService } from "../services/track_history.service";
import { UsersService } from "../services/users.service";

export class TrackHistoryController {
    private trackHistoryService: TrackHistoryService;
    private usersService: UsersService;

    constructor() {
        this.trackHistoryService = new TrackHistoryService();
        this.usersService = new UsersService();
    }

    createHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { trackId } = req.body;

            const { authorization } = req.headers;

            if (!authorization) {
                return res
                    .status(400)
                    .json({ error: "No authorization token" });
            }

            const user = await this.usersService.findUserByToken(authorization);

            if (!user) {
                return res.status(401).json({ error: "Unauthorized user" });
            }

            const result = await this.trackHistoryService.create(
                Number(trackId),
                user.id,
            );

            if (!result) {
                return res.status(404).json({ error: "Track is not found" });
            }

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };
}
