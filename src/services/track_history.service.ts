import { ITrackHistory } from "../interfaces/track_history.interface";
import { prisma } from "../lib/prisma";

export class TrackHistoryService {
    async create(trackId: number, userId: number): Promise<ITrackHistory> {
        return await prisma.trackHistory.create({
            data: {
                trackId,
                userId,
            },
        });
    }
}
