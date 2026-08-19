import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { ConflictError } from "../errors/conflict-error";
import { InternalServerError } from "../errors/internal-server-error";
import { NotFoundError } from "../errors/not-found-error";
import { prisma } from "../lib/prisma";

export abstract class BaseRepository {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    protected handleError(e: unknown, message: string): never {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                throw new ConflictError(
                    "Запись с такими данными уже существует",
                );
            }

            if (e.code === "P2025") {
                throw new NotFoundError("Запись с таким id не найдена");
            }
        }

        throw new InternalServerError(message);
    }
}
