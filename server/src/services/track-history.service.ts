import { TrackHistory } from "../../generated/prisma/client";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { TrackHistoryRepository } from "../repositories/track-history.repository";
import { TrackRepository } from "../repositories/track.repository";
import {
    CreateTrackHistoryData,
    TrackHistoryWithDetails,
} from "../types/track-history.types";

export class TrackHistoryService {
    private trackHistoryRepository: TrackHistoryRepository;
    private trackRepository: TrackRepository;

    constructor() {
        this.trackHistoryRepository = new TrackHistoryRepository();
        this.trackRepository = new TrackRepository();
    }

    async create(
        newHistory: CreateTrackHistoryData,
    ): Promise<TrackHistory | null> {
        const track = await this.trackRepository.getById(newHistory.trackId);

        if (!track) {
            throw new NotFoundError("Track is not found");
        }

        if (!track.isPublished) {
            throw new BadRequestError("Track is unpublished");
        }

        return this.trackHistoryRepository.create(newHistory);
    }

    async get(userId: string): Promise<TrackHistoryWithDetails[]> {
        const history =
            await this.trackHistoryRepository.getUserHistory(userId);

        return history.map((h) => {
            return {
                id: h.id,
                artistName: h.track.album.artist.name,
                trackTitle: h.track.title,
                datetime: h.datetime,
            };
        });
    }
}
