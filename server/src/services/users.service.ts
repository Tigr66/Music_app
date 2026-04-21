import { nanoid } from "nanoid";
import { IUser } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import _ from "lodash";

export class UsersService {
    async register(
        newUser: Omit<IUser, "id">,
    ): Promise<Omit<IUser, "password">> {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: newUser.username,
            },
        });

        if (existingUser) {
            throw new Error("User with this username is already exist");
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);

        const created = await prisma.user.create({
            data: {
                username: newUser.username,
                password: hashedPassword,
            },
        });

        return _.omit(created, ["password"]);
    }

    async login(user: Omit<IUser, "id">): Promise<Omit<IUser, "password">> {
        const loginUser = await prisma.user.findUnique({
            where: {
                username: user.username,
            },
        });

        if (!loginUser) {
            throw new Error("Incorrect username or password");
        }

        const isMatch = await bcrypt.compare(user.password, loginUser.password);

        if (!isMatch) {
            throw new Error("Incorrect username or password");
        }

        const newToken = nanoid();

        const updatedUser = await prisma.user.update({
            where: {
                id: loginUser.id,
            },
            data: {
                token: newToken,
            },
        });

        return _.omit(updatedUser, ["password"]);
    }

    async findUserByToken(token: string): Promise<IUser | null> {
        return await prisma.user.findUnique({
            where: {
                token,
            },
        });
    }
}
