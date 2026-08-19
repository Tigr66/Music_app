import { getContentWhere } from "../helpers/get-content-where.helper";
import { prisma } from "../lib/prisma";
import { removeFile } from "../utils/remove-file.util";
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

export class AlbumsService {
    private albumRepository: AlbumRepository;
    private artistRepository: ArtistRepository;

    constructor() {
        this.albumRepository = new AlbumRepository();
        this.artistRepository = new ArtistRepository();
    }

    async create(newAlbum: CreateAlbumData): Promise<Album> {
        const artist = await this.artistRepository.getById(newAlbum.artistId);

        if (!artist) {
            throw new Error("Artist not found");
        }

        return await this.albumRepository.create(newAlbum);
    }

    async getAll(user?: AuthUser): Promise<Album[]> {
        return await this.albumRepository.getAll(user);
    }

    async getArtistAlbums(
        artistId: string,
        user?: AuthUser,
    ): Promise<AlbumWithCount[]> {
        const albums = await this.albumRepository.getArtistAlbums(
            artistId,
            user,
        );

        return albums.map((a) => {
            const { _count, ...album } = a;

            return {
                ...album,
                count: _count.tracks,
            };
        });
    }

    async getById(id: string): Promise<AlbumWithArtist | null> {
        return await this.albumRepository.getById(id);
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

        return await this.albumRepository.publishAlbum(id);
    }

    async deleteAlbum(id: string): Promise<void> {
        const album = await this.albumRepository.getById(id);

        if (!album) {
            throw new NotFoundError("Album not found");
        }

        await removeFile(album.cover);

        await this.albumRepository.deleteById(id);
    }
}
