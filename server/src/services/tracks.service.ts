import { ITrack } from "../interfaces/track.interface";
import { prisma } from "../lib/prisma";

export class TracksService {
    async create(newTrack: Omit<ITrack, "id" | "number">): Promise<ITrack> {
        const album = await prisma.album.findUnique({
            where: {
                id: newTrack.albumId,
            },
            include: {
                _count: {
                    select: { tracks: true },
                },
            },
        });

        if (!album) {
            throw new Error("Album with this id is not exist");
        }

        return await prisma.track.create({
            data: {
                title: newTrack.title,
                duration: newTrack.duration,
                albumId: newTrack.albumId,
                youtubeUrl: newTrack.youtubeUrl,
                number: album._count.tracks + 1,
            },
        });
    }

    async getAll(): Promise<ITrack[]> {
        return await prisma.track.findMany({
            orderBy: {
                number: "asc",
            },
        });
    }

    async getAlbumTracks(albumId: number): Promise<ITrack[]> {
        return await prisma.track.findMany({
            where: {
                albumId,
            },
            orderBy: {
                number: "asc",
            },
        });
    }
}
