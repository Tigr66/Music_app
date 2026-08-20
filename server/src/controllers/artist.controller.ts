import { NextFunction, Response } from "express";
import { ArtistService } from "../services/artist.service";
import { AuthRequest } from "../types/auth.types";

export class ArtistController {
    private artistService: ArtistService;

    constructor() {
        this.artistService = new ArtistService();
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

            const result = await this.artistService.create(newArtist);

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

            const artists = await this.artistService.getAll(user);

            res.status(200).json(artists);
        } catch (err) {
            next(err);
        }
    };

    getArtistById = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;

            const user = req.user;

            if (typeof id !== "string") {
                return res.status(400).json({ error: "Id must be a string" });
            }

            const result = await this.artistService.getById(id);

            if (
                !result ||
                (!result.isPublished &&
                    result.userId !== user?.id &&
                    user?.role !== "ADMIN")
            ) {
                return res.status(404).json({
                    error: "Artist not found",
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

            if (typeof id !== "string") {
                return res.status(400).json({ error: "Id must be a string" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can publish artist" });
            }

            const result = await this.artistService.publishArtist(id);

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

            if (typeof id !== "string") {
                return res.status(400).json({ error: "Id must be a string" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can delete artist" });
            }

            await this.artistService.deleteArtist(id);

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
