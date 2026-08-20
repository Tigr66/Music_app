import { Track } from "../../generated/prisma/client";
import { getContentWhere } from "../helpers/get-content-where.helper";
import { AuthUser } from "../types/auth.types";
import {
    CreateTrackRepositoryInput,
    TrackWithAlbum,
} from "../types/track.types";
import { BaseRepository } from "./base.repository";

export class TrackRepository extends BaseRepository {
    async create(data: CreateTrackRepositoryInput): Promise<Track> {
        try {
            return await this.prisma.track.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Ошибка при создании трека");
        }
    }

    async getById(id: string): Promise<Track | null> {
        try {
            return await this.prisma.track.findUnique({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении трека по id");
        }
    }

    async getByIdWithAlbum(id: string): Promise<TrackWithAlbum | null> {
        try {
            return await this.prisma.track.findUnique({
                where: { id },
                include: {
                    album: true,
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении трека по id");
        }
    }


    async getAll(user?: AuthUser): Promise<Track[]> {
        try {
            return await this.prisma.track.findMany({
                orderBy: {
                    number: "asc",
                },
                where: getContentWhere(user),
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении всех треков");
        }
    }

    async getAlbumTracks(albumId: string, user?: AuthUser): Promise<Track[]> {
        try {
            return await this.prisma.track.findMany({
                where: {
                    albumId,
                    ...getContentWhere(user),
                },
                orderBy: {
                    number: "asc",
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении треков альбома");
        }
    }

    async publish(id: string): Promise<Track> {
        try {
            return await this.prisma.track.update({
                where: { id },
                data: {
                    isPublished: true,
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при публикации трека");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.prisma.track.delete({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при удалении трека");
        }
    }
}
