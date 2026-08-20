import { Track } from "../../generated/prisma/client";
import { NotFoundError } from "../errors/not-found-error";
import { AlbumRepository } from "../repositories/album.repository";
import { TrackRepository } from "../repositories/track.repository";
import { AuthUser } from "../types/auth.types";
import { CreateTrackData } from "../types/track.types";

export class TrackService {
    private trackRepository: TrackRepository;
    private albumRepository: AlbumRepository;

    constructor() {
        this.trackRepository = new TrackRepository();
        this.albumRepository = new AlbumRepository();
    }

    async create(newTrack: CreateTrackData): Promise<Track> {
        const album = await this.albumRepository.getByIdWithCount(
            newTrack.albumId,
        );

        if (!album) {
            throw new NotFoundError("Album not found");
        }

        return await this.trackRepository.create({
            title: newTrack.title,
            duration: newTrack.duration,
            albumId: newTrack.albumId,
            youtubeUrl: newTrack.youtubeUrl,
            number: album._count.tracks + 1,
            userId: newTrack.userId,
        });
    }

    async getAll(user?: AuthUser): Promise<Track[]> {
        return await this.trackRepository.getAll(user);
    }

    async getAlbumTracks(albumId: string, user?: AuthUser): Promise<Track[]> {
        return await this.trackRepository.getAlbumTracks(albumId, user);
    }

    async publishTrack(id: string): Promise<Track> {
        const track = await this.trackRepository.getByIdWithAlbum(id);

        if (!track) {
            throw new NotFoundError("Track not found");
        }

        if (!track.album.isPublished) {
            throw new Error(
                "Cannot publish track because album is not published",
            );
        }

        return await this.trackRepository.publish(id);
    }

    async deleteTrack(id: string): Promise<void> {
        const track = await this.trackRepository.getById(id);

        if (!track) {
            throw new NotFoundError("Track not found");
        }

        await this.trackRepository.deleteById(id);
    }
}
