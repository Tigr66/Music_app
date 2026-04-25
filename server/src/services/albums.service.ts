import { getContentWhere } from "../helpers/get-content-where.helper";
import { IAlbumWithArtist } from "../interfaces/album-with-artist.interface";
import { IAlbumWithCount } from "../interfaces/album-with-count.interface";
import { IAlbum } from "../interfaces/album.interface";
import { IUser } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";
import _ from "lodash";

export class AlbumsService {
    async create(
        newAlbum: Omit<IAlbum, "id" | "isPublished">,
    ): Promise<IAlbum> {
        return await prisma.album.create({
            data: {
                ...newAlbum,
            },
        });
    }

    async getAll(user?: IUser): Promise<IAlbum[]> {
        return await prisma.album.findMany({
            orderBy: {
                publishedAt: "asc",
            },
            where: getContentWhere(user),
        });
    }

    async getArtistAlbums(
        artistId: number,
        user?: IUser,
    ): Promise<IAlbumWithCount[]> {
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
            const album = { ...a, count: a._count.tracks };
            return _.omit(album, ["_count"]);
        });
    }

    async getById(id: number): Promise<IAlbumWithArtist | null> {
        return await prisma.album.findUnique({
            where: { id },
            include: {
                artist: true,
            },
        });
    }
}
