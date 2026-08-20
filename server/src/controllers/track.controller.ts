import { NextFunction, Response } from "express";
import { ITrack } from "../interfaces/track.interface";
import { TracksService } from "../services/track.service";
import { getYoutubeUrl } from "../utils/get-youtube-url.util";
import { AuthRequest } from "../types/auth.types";

export class TracksController {
    private tracksService: TracksService;

    constructor() {
        this.tracksService = new TracksService();
    }

    createTrack = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { title, duration, albumId, youtubeUrl } = req.body;

            const user = req.user!;

            const newYoutubeUrl = getYoutubeUrl(youtubeUrl);

            if (!newYoutubeUrl) {
                return res.status(400).json({ error: "Invalid YouTube URL" });
            }

            const newTrack = {
                title,
                duration: Number(duration),
                albumId: Number(albumId),
                youtubeUrl: newYoutubeUrl,
                userId: user.id,
            };

            const result = await this.tracksService.create(newTrack);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getTracks = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { album } = req.query;

            const user = req.user;

            if (album && isNaN(Number(album))) {
                return res
                    .status(400)
                    .json({ error: "Album must be a number" });
            }

            const tracks = album
                ? await this.tracksService.getAlbumTracks(Number(album), user)
                : await this.tracksService.getAll(user);

            res.status(200).json(tracks);
        } catch (err) {
            next(err);
        }
    };

    publishTrack = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            const user = req.user!;

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can publish track" });
            }

            const result = await this.tracksService.publishTrack(Number(id));

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    deleteTrack = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            const user = req.user!;

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can delete track" });
            }

            await this.tracksService.deleteTrack(Number(id));

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
