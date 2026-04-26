import { getContentWhere } from "../helpers/get-content-where.helper";
import { IArtist } from "../interfaces/artist.interface";
import { IUser } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";
import { removeFile } from "../utils/remove-file.util";

export class ArtistsService {
    async create(
        newArtist: Omit<IArtist, "id" | "isPublished">,
    ): Promise<IArtist> {
        return await prisma.artist.create({
            data: {
                ...newArtist,
            },
        });
    }

    async getAll(user?: IUser): Promise<IArtist[]> {
        return await prisma.artist.findMany({
            where: getContentWhere(user),
        });
    }

    async getById(id: number): Promise<IArtist | null> {
        return await prisma.artist.findUnique({
            where: { id },
        });
    }

    async publishArtist(id: number): Promise<IArtist> {
        const artist = await prisma.artist.findUnique({
            where: { id },
        });

        if (!artist) {
            throw new Error("Artist not found");
        }

        return await prisma.artist.update({
            where: { id },
            data: {
                isPublished: true,
            },
        });
    }

    async deleteArtist(id: number): Promise<void> {
        const artist = await prisma.artist.findUnique({
            where: { id },
            include: {
                albums: true,
            },
        });

        if (!artist) {
            throw new Error("Artist not found");
        }

        await removeFile(artist.photo);
        await Promise.all(artist.albums.map((a) => removeFile(a.cover)));

        await prisma.artist.delete({
            where: { id },
        });
    }
}
