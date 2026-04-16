import { IHistoryWithDetails } from "../interfaces/history-with-details.interface";
import { ITrackHistory } from "../interfaces/track_history.interface";
import { prisma } from "../lib/prisma";

export class TrackHistoryService {
    async create(
        trackId: number,
        userId: number,
    ): Promise<ITrackHistory | null> {
        const track = await prisma.track.findUnique({
            where: {
                id: trackId,
            },
        });

        if (!track) {
            return null;
        }

        return await prisma.trackHistory.create({
            data: {
                trackId,
                userId,
            },
        });
    }

    async get(userId: number): Promise<IHistoryWithDetails[]> {
        const history = await prisma.trackHistory.findMany({
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

        return history.map((el) => {
            return {
                id: el.id,
                artistName: el.track.album.artist.name,
                trackTitle: el.track.title,
                datetime: el.datetime,
            };
        });
    }
}
