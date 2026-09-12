import { User } from "../../generated/prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { BaseRepository } from "./base.repository";

export class AuthRepository extends BaseRepository {
    async create(data: CreateUserDto): Promise<User> {
        try {
            return await this.prisma.user.create({
                data,
            });
        } catch (e) {
            this.handleError(e, "Error while creating user");
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
                "Error while updating user's refresh token",
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
            this.handleError(e, "Error while fetching user by username");
        }
    }

    async getById(id: string): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
            });
        } catch (e) {
            this.handleError(e, "Error while fetching user by id");
        }
    }

    async clearRefreshToken(userId: string): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { refreshToken: null },
            });
        } catch (e) {
            this.handleError(
                e,
                "Error while clearing user's refresh token",
            );
        }
    }
}
