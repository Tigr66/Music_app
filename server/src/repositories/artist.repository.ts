import { Artist } from "../../generated/prisma/client";
import { getContentWhere } from "../helpers/get-content-where.helper";
import { ArtistWithAlbums, CreateArtistData } from "../types/artist.types";
import { AuthUser } from "../types/auth.types";
import { BaseRepository } from "./base.repository";

export class ArtistRepository extends BaseRepository {
    async create(data: CreateArtistData): Promise<Artist> {
        try {
            return await this.prisma.artist.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Ошибка при создании артиста");
        }
    }

    async getAll(user?: AuthUser): Promise<Artist[]> {
        try {
            return await this.prisma.artist.findMany({
                where: getContentWhere(user),
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении всех артистов");
        }
    }

    async getByIdWithAlbums(id: string): Promise<ArtistWithAlbums | null> {
        try {
            return await this.prisma.artist.findUnique({
                where: { id },
                include: {
                    albums: true,
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении артиста");
        }
    }

    async getById(id: string): Promise<Artist | null> {
        try {
            return await this.prisma.artist.findUnique({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении артиста по id");
        }
    }

    async publish(id: string): Promise<Artist> {
        try {
            return await this.prisma.artist.update({
                where: { id },
                data: {
                    isPublished: true,
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при публикации артиста");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.prisma.artist.delete({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при удалении артиста");
        }
    }
}
