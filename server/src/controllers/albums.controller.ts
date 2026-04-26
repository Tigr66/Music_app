import { NextFunction, Response } from "express";
import { AlbumsService } from "../services/albums.service";
import { AuthRequest } from "../types/auth.types";

export class AlbumsController {
    private albumsService: AlbumsService;

    constructor() {
        this.albumsService = new AlbumsService();
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
                artistId: Number(artistId),
                publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
                cover: `/uploads/albums/${cover.filename}`,
                userId: user.id,
            };

            const result = await this.albumsService.create(newAlbum);

            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getAlbums = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { artist } = req.query;

            const user = req.user;

            if (artist && isNaN(Number(artist))) {
                return res.status(400).json({
                    error: "Artist must be a number",
                });
            }

            const albums = artist
                ? await this.albumsService.getArtistAlbums(Number(artist), user)
                : await this.albumsService.getAll(user);

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

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            const result = await this.albumsService.getById(Number(id));

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

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can publish album" });
            }

            const result = await this.albumsService.publishAlbum(Number(id));

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

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            if (user.role !== "ADMIN") {
                return res
                    .status(403)
                    .json({ error: "Only admin can delete album" });
            }

            await this.albumsService.deleteAlbum(Number(id));

            res.status(200).json({ message: "Succesfully deleted" });
        } catch (err) {
            next(err);
        }
    };
}
