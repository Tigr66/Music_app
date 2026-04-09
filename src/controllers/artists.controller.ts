import { NextFunction, Request, Response } from "express";
import { ArtistsService } from "../services/artists.service";
import { IArtist } from "../interfaces/artist.interface";

export class ArtistsController {
    private artistsService: ArtistsService;

    constructor() {
        this.artistsService = new ArtistsService();
    }

    createArtist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, info } = req.body;

            const photo = req.file;

            if (!photo) {
                return res.status(400).json({ error: "Photo is required" });
            }

            const newArtist: Omit<IArtist, "id"> = {
                name,
                info,
                photo: `/uploads/artists/${photo.filename}`,
            };

            const result = await this.artistsService.create(newArtist);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getArtists = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const artists = await this.artistsService.getAll();

            res.status(200).json(artists);
        } catch (err) {
            next(err);
        }
    };
}
