import { IAlbumWithArtist } from "../interfaces/album-with-artist.interface";
import { IAlbum } from "../interfaces/album.interface";
import { prisma } from "../lib/prisma";

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
        return await prisma.album.findMany();
    }

    async getArtistAlbums(artistId: number): Promise<IAlbum[]> {
        return await prisma.album.findMany({
            where: {
                artistId,
            },
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
