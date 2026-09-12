import { Artist } from "../../generated/prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { ArtistRepository } from "../repositories/artist.repository";
import { CreateArtistData } from "../types/artist.types";
import { AuthUser } from "../types/auth.types";
import { StorageService } from "./storage.service";

export class ArtistService {
    private artistRepository: ArtistRepository;
    private storageService: StorageService;
    
    private readonly folder: string = "artists";

    constructor() {
        this.artistRepository = new ArtistRepository();
        this.storageService = new StorageService();
    }

    async create(newArtist: CreateArtistData): Promise<Artist> {
        const photoKey = await this.storageService.upload({
            folder: this.folder,
            buffer: newArtist.photo.buffer,
            contentType: newArtist.photo.mimetype,
        });

        try {
            return await this.artistRepository.create({
                ...newArtist,
                photo: photoKey,
            });
        } catch (error) {
            await this.storageService.delete({
                objectName: photoKey,
            });

            throw error;
        }
    }

    async getAll(user?: AuthUser): Promise<Artist[]> {
        const artists = await this.artistRepository.getAll(user);
        return await Promise.all(
            artists.map(async (artist) => {
                const photo = await this.storageService.getUrl({
                    objectName: artist.photo,
                });
                return { ...artist, photo };
            }),
        );
    }

    async getById(id: string): Promise<Artist | null> {
        const artist = await this.artistRepository.getById(id);

        if (!artist) {
            return null;
        }

        const photo = await this.storageService.getUrl({
            objectName: artist.photo,
        });

        return {
            ...artist,
            photo,
        };
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

        await this.artistRepository.deleteById(id);

        await this.storageService.delete({
            objectName: artist.photo,
        });

        await Promise.all(
            artist.albums.map((album) =>
                this.storageService.delete({
                    objectName: album.cover,
                }),
            ),
        );
    }
}
