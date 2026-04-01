import { Request, Response } from "express";
import { ArtistsService } from "../services/artists.service";
import { IArtist } from "../interfaces/artist.interface";

export class ArtistsController {
    private artistsService: ArtistsService;

    constructor() {
        this.artistsService = new ArtistsService();
    }

    createArtist = async (req: Request, res: Response) => {
        try {
            const { name, info } = req.body;

            const photo = req.file;

            if (!photo) {
                res.status(400).json({ message: "Photo is required" });
                return;
            }

            const newArtist: Omit<IArtist, "id"> = {
                name,
                info,
                photo: `/uploads/artists/${photo.filename}`,
            };

            const result = this.artistsService.create(newArtist);

            res.status(201).json(result);
        } catch {
            res.status(500).json({ error: "Creating artist failed" });
        }
    };
    
    getArtists = async (_: Request, res: Response) => {
        try {
            const artists = await this.artistsService.getAll();

            res.status(200).json(artists);
        } catch {
            res.status(500).json({ error: "Getting artists failed" });
        }
    };
}
