import { getContentWhere } from "../helpers/get-content-where.helper";
import { IArtist } from "../interfaces/artist.interface";
import { IUser } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";

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
}
