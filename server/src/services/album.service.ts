import { Album } from "../../generated/prisma/client";
import { AuthUser } from "../types/auth.types";
import {
    AlbumWithArtist,
    AlbumWithCount,
    CreateAlbumData,
} from "../types/album.types";
import { AlbumRepository } from "../repositories/album.repository";
import { ArtistRepository } from "../repositories/artist.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { StorageService } from "./storage.service";

export class AlbumService {
    private albumRepository: AlbumRepository;
    private artistRepository: ArtistRepository;
    private storageService: StorageService;
    
    private readonly folder: string = "albums";

    constructor() {
        this.albumRepository = new AlbumRepository();
        this.artistRepository = new ArtistRepository();
        this.storageService = new StorageService();
    }

    async create(newAlbum: CreateAlbumData): Promise<Album> {
        const artist = await this.artistRepository.getById(newAlbum.artistId);

        if (!artist) {
            throw new Error("Artist not found");
        }

        const coverKey = await this.storageService.upload({
            folder: this.folder,
            buffer: newAlbum.cover.buffer,
            contentType: newAlbum.cover.mimetype,
        });

        try {
            return await this.albumRepository.create({
                ...newAlbum,
                cover: coverKey,
            });
        } catch (error) {
            await this.storageService.delete({
                objectName: coverKey,
            });

            throw error;
        }
    }

    async getAll(user?: AuthUser): Promise<Album[]> {
        const albums = await this.albumRepository.getAll(user);

        return await Promise.all(
            albums.map(async (album) => {
                const cover = await this.storageService.getUrl({
                    objectName: album.cover,
                });
                return {
                    ...album,
                    cover,
                };
            }),
        );
    }

    async getArtistAlbums(
        artistId: string,
        user?: AuthUser,
    ): Promise<AlbumWithCount[]> {
        const albums = await this.albumRepository.getArtistAlbums(
            artistId,
            user,
        );

        const albumsWithCount = albums.map((a) => {
            const { _count, ...album } = a;

            return {
                ...album,
                count: _count.tracks,
            };
        });

        return await Promise.all(
            albumsWithCount.map(async (album) => {
                const cover = await this.storageService.getUrl({
                    objectName: album.cover,
                });
                return {
                    ...album,
                    cover,
                };
            }),
        );
    }

    async getById(id: string): Promise<AlbumWithArtist | null> {
        const album = await this.albumRepository.getById(id);

        if (!album) {
            return null;
        }

        const cover = await this.storageService.getUrl({
            objectName: album.cover,
        });

        return {
            ...album,
            cover,
        };
    }

    async publishAlbum(id: string): Promise<Album> {
        const album = await this.albumRepository.getById(id);

        if (!album) {
            throw new NotFoundError("Album not found");
        }

        if (!album.artist.isPublished) {
            throw new BadRequestError(
                "Cannot publish album because artist is not published",
            );
        }

        return await this.albumRepository.publish(id);
    }

    async deleteAlbum(id: string): Promise<void> {
        const album = await this.albumRepository.getById(id);

        if (!album) {
            throw new NotFoundError("Album not found");
        }

        await this.albumRepository.deleteById(id);

        await this.storageService.delete({
            objectName: album.cover,
        });
    }
}
