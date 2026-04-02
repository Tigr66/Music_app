import { Request, Response } from "express";
import { ITrack } from "../interfaces/track.interface";
import { TracksService } from "../services/tracks.service";

export class TracksController {
    private tracksService: TracksService;

    constructor() {
        this.tracksService = new TracksService();
    }

    createTrack = async (req: Request, res: Response) => {
        try {
            const { title, duration, albumId } = req.body;

            const newTrack: Omit<ITrack, "id"> = {
                title,
                duration: Number(duration),
                albumId: Number(albumId),
            };

            const result = await this.tracksService.create(newTrack);

            res.status(201).json(result);
        } catch {
            res.status(500).json({ error: "Creating track failed" });
        }
    };

    getTracks = async (req: Request, res: Response) => {
        try {
            const { album } = req.query;

            if (album && isNaN(Number(album))) {
                res.status(400).json({ error: "Album must be a number" });
                return;
            }

            const tracks = album
                ? await this.tracksService.getAlbumTracks(Number(album))
                : await this.tracksService.getAll();

            res.status(200).json(tracks);
        } catch {
            res.status(500).json({ error: "Getting tracks failed" });
        }
    };
}
