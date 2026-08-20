import { NextFunction, Response } from "express";
import { TrackService } from "../services/track.service";
import { getYoutubeUrl } from "../utils/get-youtube-url.util";
import { AuthRequest } from "../types/auth.types";

export class TrackController {
    private trackService: TrackService;

    constructor() {
        this.trackService = new TrackService();
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
                title: title.trim(),
                duration: Number(duration),
                albumId: albumId,
                youtubeUrl: newYoutubeUrl,
                userId: user.id,
            };

            const result = await this.trackService.create(newTrack);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getTracks = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { album } = req.query;

            const user = req.user;

            if (typeof album !== "string") {
                return res
                    .status(400)
                    .json({ error: "Album ID must be a string" });
            }

            const tracks = album
                ? await this.trackService.getAlbumTracks(album, user)
                : await this.trackService.getAll(user);

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

            if (typeof id !== "string") {
                return res.status(400).json({ error: "Id must be a string" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can publish track" });
            }

            const result = await this.trackService.publishTrack(id);

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

            if (typeof id !== "string") {
                return res.status(400).json({ error: "Id must be a string" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can delete track" });
            }

            await this.trackService.deleteTrack(id);

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
