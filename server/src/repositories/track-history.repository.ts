import { TrackHistory } from "../../generated/prisma/client";
import { CreateTrackHistoryData, TrackHistoryWithDetailsRepository } from "../types/track-history.types";
import { BaseRepository } from "./base.repository";

export class TrackHistoryRepository extends BaseRepository {
    async create(data: CreateTrackHistoryData): Promise<TrackHistory> {
        try {
            return await this.prisma.trackHistory.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Ошибка при создании истории трека");
        }
    }

    async getUserHistory(userId: string): Promise<TrackHistoryWithDetailsRepository[]> {
        try {
            return await this.prisma.trackHistory.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    datetime: "desc",
                },
                select: {
                    id: true,
                    datetime: true,
                    track: {
                        select: {
                            title: true,
                            album: {
                                select: {
                                    artist: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении истории пользователя");
        }
    }
}
