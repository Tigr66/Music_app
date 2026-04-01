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

            const photo = req.file;

            if (!photo) {
                res.status(400).json({ message: "Photo is required" });
                return;
            }

            const newArtist: Omit<ITrack, "id"> = {
                title,
                duration,
                albumId,
            };

            const result = this.tracksService.create(newArtist);

            res.status(201).json(result);
        } catch {
            res.status(500).json({ error: "Creating track failed" });
        }
    };
    getTracks = async (_: Request, res: Response) => {
        try {
            const tracks = await this.tracksService.getAll();

            res.status(200).json(tracks);
        } catch {
            res.status(500).json({ error: "Getting tracks failed" });
        }
    };
}
