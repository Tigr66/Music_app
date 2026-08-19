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

export class AlbumsService {
    async create(newAlbum: CreateAlbumData): Promise<Album> {
        const artist = await prisma.artist.findUnique({
            where: { id: newAlbum.artistId },
        });

        if (!artist) {
            throw new Error("Artist not found");
        }

        return await prisma.album.create({
            data: {
                ...newAlbum,
            },
        });
    }

    async getAll(user?: AuthUser): Promise<Album[]> {
        return await prisma.album.findMany({
            orderBy: {
                publishedAt: "asc",
            },
            where: getContentWhere(user),
        });
    }

    async getArtistAlbums(
        artistId: string,
        user?: AuthUser,
    ): Promise<AlbumWithCount[]> {
        const albums = await prisma.album.findMany({
            where: {
                artistId,
                ...getContentWhere(user),
            },
            include: {
                _count: {
                    select: { tracks: true },
                },
            },
            orderBy: {
                publishedAt: "asc",
            },
        });

        return albums.map((a) => {
            const { _count, ...album } = a;

            return {
                ...album,
                count: _count.tracks,
            };
        });
    }

    async getById(id?: string): Promise<AlbumWithArtist | null> {
        if (!id) {
            return null;
        }

        return await prisma.album.findUnique({
            where: { id },
            include: {
                artist: true,
            },
        });
    }

    async publishAlbum(id: string): Promise<Album> {
        const album = await prisma.album.findUnique({
            where: { id },
            include: {
                artist: true,
            },
        });

        if (!album) {
            throw new Error("Album not found");
        }

        if (!album.artist.isPublished) {
            throw new Error(
                "Cannot publish album because artist is not published",
            );
        }

        return await prisma.album.update({
            where: { id },
            data: {
                isPublished: true,
            },
        });
    }

    async deleteAlbum(id: string): Promise<void> {
        const album = await prisma.album.findUnique({
            where: { id },
        });

        if (!album) {
            throw new Error("Album not found");
        }

        await removeFile(album.cover);

        await prisma.album.delete({
            where: { id },
        });
    }
}
