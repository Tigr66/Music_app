import { Artist } from "../../generated/prisma/client";
import { BaseRepository } from "./base.repository";

export class ArtistRepository extends BaseRepository {
    async getById(id: string): Promise<Artist | null> {
        try {
            return await this.prisma.artist.findUnique({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Ошибка при получении артиста по id");
        }
    }
}
