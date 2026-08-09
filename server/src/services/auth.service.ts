import { prisma } from "../lib/prisma";
import { ConflictError } from "../errors/conflict-error";
import { BadRequestError } from "../errors/bad-request-error";
import { JwtService } from "./jwt.service";
import { AuthUser, loginUser } from "../types/auth.types";
import { LoginUserDto } from "../dto/login-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import bcrypt from "bcrypt";

export class AuthService {
    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
    }

    async register(newUser: CreateUserDto): Promise<AuthUser> {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: newUser.username,
            },
        });

        if (existingUser) {
            throw new ConflictError("User with this username is already exist");
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

        const { password, ...userWithoutPassword } = created;

        return userWithoutPassword;
    }

    async login(user: LoginUserDto): Promise<loginUser> {
        const loginUser = await prisma.user.findUnique({
            where: {
                username: user.username,
            },
        });

        if (!loginUser) {
            throw new BadRequestError("Incorrect username or password");
        }

        const isMatch = await bcrypt.compare(user.password, loginUser.password);

        if (!isMatch) {
            throw new BadRequestError("Incorrect username or password");
        }

        const payload: AuthUser = {
            id: loginUser.id,
            username: loginUser.username,
            role: loginUser.role,
        };

        const refreshToken = this.jwtService.setRefreshToken(payload);

        const accessToken = this.jwtService.setAccessToken(payload);

        const updatedUser = await prisma.user.update({
            where: {
                id: loginUser.id,
            },
            data: {
                refreshToken: refreshToken,
            },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            role: updatedUser.role,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async logout(userId: string): Promise<void> {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: null,
            },
        });
    }
}
