import { NextFunction, Response } from "express";
import { AlbumService } from "../services/album.service";
import { AuthRequest } from "../types/auth.types";

export class AlbumController {
    private albumService: AlbumService;

    constructor() {
        this.albumService = new AlbumService();
    }

    createAlbum = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { title, artistId, publishedAt } = req.body;

            const cover = req.file;

            const user = req.user!;

            if (!cover) {
                res.status(400).json({ error: "Cover is required" });
                return;
            }

            const newAlbum = {
                title,
                artistId: artistId,
                publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
                cover: `/uploads/albums/${cover.filename}`,
                userId: user.id,
            };

            const result = await this.albumService.create(newAlbum);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getAlbums = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { artist } = req.query;

            const user = req.user;

            const albums =
                typeof artist === "string"
                    ? await this.albumService.getArtistAlbums(artist, user)
                    : await this.albumService.getAll(user);

            res.status(200).json(albums);
        } catch (err) {
            next(err);
        }
    };

    getAlbumById = async (
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

            const result = await this.albumService.getById(id);

            if (
                !result ||
                (!result.isPublished &&
                    result.userId !== user?.id &&
                    user?.role !== "ADMIN")
            ) {
                return res.status(404).json({
                    error: "Album not found",
                });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    publishAlbum = async (
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
                    .json({ error: "Only admin can publish album" });
            }

            const result = await this.albumService.publishAlbum(id);

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    deleteAlbum = async (
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
                    .json({ error: "Only admin can delete album" });
            }

            await this.albumService.deleteAlbum(id);

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
