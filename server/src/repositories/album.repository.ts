import { Album } from "../../generated/prisma/browser";
import { getContentWhere } from "../helpers/get-content-where.helper";
import {
    AlbumWithArtist,
    AlbumWithCountFromPrisma,
    CreateAlbumRepositoryInput,
} from "../types/album.types";
import { AuthUser } from "../types/auth.types";
import { BaseRepository } from "./base.repository";

export class AlbumRepository extends BaseRepository {
    async create(data: CreateAlbumRepositoryInput): Promise<Album> {
        try {
            return await this.prisma.album.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Error while creating album");
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
            this.handleError(e, "Error while fetching all albums");
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
            this.handleError(e, "Error while fetching artist's albums");
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
                "Error while fetching album by id with track count",
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
            this.handleError(e, "Error while fetching album by id");
        }
    }

    async publish(id: string): Promise<Album> {
        try {
            return await this.prisma.album.update({
                where: { id },
                data: { isPublished: true },
            });
        } catch (e) {
            this.handleError(e, "Error while publishing album");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.prisma.album.delete({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Error while deleting album by id");
        }
    }
}
