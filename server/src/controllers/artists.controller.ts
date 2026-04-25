import { NextFunction, Request, Response } from "express";
import { ArtistsService } from "../services/artists.service";
import { AuthRequest } from "../types/auth.types";

export class ArtistsController {
    private artistsService: ArtistsService;

    constructor() {
        this.artistsService = new ArtistsService();
    }

    createArtist = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { name, info } = req.body;

            const photo = req.file;

            const user = req.user!;

            if (!photo) {
                return res.status(400).json({ error: "Photo is required" });
            }

            const newArtist = {
                name,
                info,
                photo: `/uploads/artists/${photo.filename}`,
                userId: user.id,
            };

            const result = await this.artistsService.create(newArtist);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getArtists = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = req.user;

            const artists = await this.artistsService.getAll(user);

            res.status(200).json(artists);
        } catch (err) {
            next(err);
        }
    };

    getArtistById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            const result = await this.artistsService.getById(Number(id));

            if (!result) {
                return res.status(400).json({
                    error: "Artist is not exist",
                });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    publishArtist = async (
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
                    .json({ error: "Only admin can publish artist" });
            }

            const result = await this.artistsService.publishArtist(Number(id));

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    deleteArtist = async (
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
                    .json({ error: "Only admin can delete artist" });
            }

            await this.artistsService.deleteArtist(Number(id));

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
