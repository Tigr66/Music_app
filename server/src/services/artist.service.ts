import { Artist } from "../../generated/prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { ArtistRepository } from "../repositories/artist.repository";
import { CreateArtistData } from "../types/artist.types";
import { AuthUser } from "../types/auth.types";
import { removeFile } from "../utils/remove-file.util";

export class ArtistService {
    private artistRepository: ArtistRepository;

    constructor() {
        this.artistRepository = new ArtistRepository();
    }

    async create(newArtist: CreateArtistData): Promise<Artist> {
        return await this.artistRepository.create(newArtist);
    }

    async getAll(user?: AuthUser): Promise<Artist[]> {
        return await this.artistRepository.getAll(user);
    }

    async getById(id: string): Promise<Artist | null> {
        return await this.artistRepository.getById(id);
    }

    async publishArtist(id: string): Promise<Artist> {
        const artist = await this.artistRepository.getById(id);

        if (!artist) {
            throw new NotFoundError("Artist not found");
        }

        return await this.artistRepository.publish(id);
    }

    async deleteArtist(id: string): Promise<void> {
        const artist = await this.artistRepository.getByIdWithAlbums(id);

        if (!artist) {
            throw new NotFoundError("Artist not found");
        }

        await removeFile(artist.photo);
        
        await Promise.all(artist.albums.map((a) => removeFile(a.cover)));

        await this.artistRepository.deleteById(id);
    }
}
