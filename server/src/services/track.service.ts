import { getContentWhere } from "../helpers/get-content-where.helper";
import { ITrack } from "../interfaces/track.interface";
import { IUser } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";

export class TracksService {
    async create(
        newTrack: Omit<ITrack, "id" | "number" | "isPublished">,
    ): Promise<ITrack> {
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
            throw new Error("Album not found");
        }

        return await prisma.track.create({
            data: {
                title: newTrack.title,
                duration: newTrack.duration,
                albumId: newTrack.albumId,
                youtubeUrl: newTrack.youtubeUrl,
                number: album._count.tracks + 1,
                userId: newTrack.userId,
            },
        });
    }

    async getAll(user?: IUser): Promise<ITrack[]> {
        return await prisma.track.findMany({
            orderBy: {
                number: "asc",
            },
            where: getContentWhere(user),
        });
    }

    async getAlbumTracks(albumId: number, user?: IUser): Promise<ITrack[]> {
        return await prisma.track.findMany({
            where: {
                albumId,
                ...getContentWhere(user),
            },
            orderBy: {
                number: "asc",
            },
        });
    }

    async publishTrack(id: number): Promise<ITrack> {
        const track = await prisma.track.findUnique({
            where: { id },
            include: {
                album: true,
            },
        });

        if (!track) {
            throw new Error("Track not found");
        }

        if (!track.album.isPublished) {
            throw new Error(
                "Cannot publish track because album is not published",
            );
        }

        return await prisma.track.update({
            where: { id },
            data: {
                isPublished: true,
            },
        });
    }

    async deleteTrack(id: number): Promise<void> {
        const track = await prisma.track.findUnique({
            where: { id },
        });

        if (!track) {
            throw new Error("Track not found");
        }

        await prisma.track.delete({
            where: { id },
        });
    }
}
