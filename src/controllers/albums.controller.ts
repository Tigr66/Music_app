import { Request, Response } from "express";
import { AlbumsService } from "../services/albums.service";

export class AlbumsController {
    private albumsService: AlbumsService;

    constructor() {
        this.albumsService = new AlbumsService();
    }

    createAlbum = async (req: Request, res: Response) => {
        try {
            const { title, artistId, publishedAt } = req.body;

            const cover = req.file;

            if (!cover) {
                res.status(400).json({ error: "Cover is required" });
                return;
            }

            const newAlbum = {
                title,
                artistId: Number(artistId),
                publishedAt: new Date(publishedAt),
                cover: `/uploads/albums/${cover.filename}`,
            };

            const result = await this.albumsService.create(newAlbum);

            res.status(201).json(result);
        } catch {
            res.status(500).json({ error: "Creating album failed" });
        }
    };

    getAlbums = async (req: Request, res: Response) => {
        try {
            const { artist } = req.query;

            if (artist && isNaN(Number(artist))) {
                res.status(400).json({
                    error: "Artist must be a number",
                });
                return;
            }

            const albums = artist
                ? await this.albumsService.getArtistAlbums(Number(artist))
                : await this.albumsService.getAll();

            res.status(200).json(albums);
        } catch {
            res.status(500).json({ error: "Getting albums failed" });
        }
    };

    getAlbumById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (isNaN(Number(id))) {
                return res.status(400).json({ error: "Id must be a number" });
            }

            const result = await this.albumsService.getById(Number(id));

            if (!result) {
                res.status(400).json({
                    error: "Album is not exist",
                });
                return;
            }

            res.status(200).json(result);
        } catch {
            res.status(500).json({ error: "Getting album by id failed" });
        }
    };
}
