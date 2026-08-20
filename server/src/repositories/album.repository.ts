import { Album } from "../../generated/prisma/browser";
import { getContentWhere } from "../helpers/get-content-where.helper";
import {
    AlbumWithArtist,
    AlbumWithCountFromPrisma,
    CreateAlbumData,
} from "../types/album.types";
import { AuthUser } from "../types/auth.types";
import { BaseRepository } from "./base.repository";

export class AlbumRepository extends BaseRepository {
    async create(data: CreateAlbumData): Promise<Album> {
        try {
            return await this.prisma.album.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Ошибка при создании альбома");
        }
    }

    async getAll(user?: AuthUser): Promise<Album[]> {
        try {
            return await this.prisma.album.findMany({
                orderBy: {
                    publishedAt: "asc",
                },
                where: getContentWhere(user),
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении всех альбомов");
        }
    }

    async getArtistAlbums(
        artistId: string,
        user?: AuthUser,
    ): Promise<AlbumWithCountFromPrisma[]> {
        try {
            return await this.prisma.album.findMany({
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
        } catch (e) {
            this.handleError(e, "Ошибка при получении альбомов артиста");
        }
    }

    async getByIdWithCount(
        id: string,
    ): Promise<AlbumWithCountFromPrisma | null> {
        try {
            return await this.prisma.album.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: { tracks: true },
                    },
                },
            });
        } catch (e) {
            this.handleError(
                e,
                "Ошибка при получении альбома по id с количеством треков",
            );
        }
    }

    async getById(id: string): Promise<AlbumWithArtist | null> {
        try {
            return await this.prisma.album.findUnique({
                where: { id },
                include: {
                    artist: true,
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении альбома по id");
        }
    }

    async publish(id: string): Promise<Album> {
        try {
            return await this.prisma.album.update({
                where: { id },
                data: { isPublished: true },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при публикации альбома");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.prisma.album.delete({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при удалении альбома по id");
        }
    }
}
