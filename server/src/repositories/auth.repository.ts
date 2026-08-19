import { User } from "../../generated/prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { BaseRepository } from "./base.repository";

export class AuthRepository extends BaseRepository {
    async create(newUser: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({
                data: newUser,
            });
        } catch (e) {
            this.handleError(e, "Ошибка при создании пользователя");
        }
    }

    async updateRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { refreshToken },
            });
        } catch (e) {
            this.handleError(
                e,
                "Ошибка при обновлении refresh token пользователя",
            );
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username },
            });

            return user;
        } catch (e) {
            this.handleError(e, "Ошибка при получении пользователя по id");
        }
    }

    getByRefreshToken(refreshToken: string): Promise<User | null> {
        try {
            return this.prisma.user.findUnique({
                where: { refreshToken },
            });
        } catch (e) {
            this.handleError(
                e,
                "Ошибка при получении пользователя по refresh token",
            );
        }
    }
}
