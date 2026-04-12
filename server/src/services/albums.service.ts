import { IAlbumWithArtist } from "../interfaces/album-with-artist.interface";
import { IAlbumWithCount } from "../interfaces/album-with-count.interface";
import { IAlbum } from "../interfaces/album.interface";
import { prisma } from "../lib/prisma";
import _ from "lodash";

export class AlbumsService {
    async create(newAlbum: Omit<IAlbum, "id">): Promise<IAlbum> {
        return await prisma.album.create({
            data: {
                title: newAlbum.title,
                artistId: newAlbum.artistId,
                cover: newAlbum.cover,
                publishedAt: newAlbum.publishedAt,
            },
        });
    }

    async getAll(): Promise<IAlbum[]> {
        return await prisma.album.findMany({
            orderBy: {
                publishedAt: "asc",
            },
        });
    }

    async getArtistAlbums(artistId: number): Promise<IAlbumWithCount[]> {
        const albums = await prisma.album.findMany({
            where: {
                artistId,
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
            const album = { ...a, count: a._count.tracks };
            return _.omit(album, ["_count"]);
        });
    }

    async getById(id: number): Promise<IAlbumWithArtist | null> {
        return await prisma.album.findUnique({
            where: { id },
            include: {
                artist: {
                    select: {
                        id: true,
                        name: true,
                        photo: true,
                        info: true,
                    },
                },
            },
        });
    }
}
