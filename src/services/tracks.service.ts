import { ITrack } from "../interfaces/track.interface";
import { prisma } from "../lib/prisma";

export class TracksService {
    async create(newTrack: Omit<ITrack, "id">): Promise<ITrack> {
        return await prisma.track.create({
            data: {
                title: newTrack.title,
                duration: newTrack.duration,
                albumId: newTrack.albumId,
            },
        });
    }

    async getAll(): Promise<ITrack[]> {
        return await prisma.track.findMany();
    }
}
