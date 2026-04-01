import { IArtist } from "../interfaces/artist.interface";
import { prisma } from "../lib/prisma";

export class ArtistsService {
    async create(newArtist: Omit<IArtist, "id">): Promise<IArtist> {
        return await prisma.artist.create({
            data: {
                name: newArtist.name,
                photo: newArtist.photo,
                info: newArtist.info,
            },
        });
    }

    async getAll(): Promise<IArtist[]> {
        return await prisma.artist.findMany();
    }
}
