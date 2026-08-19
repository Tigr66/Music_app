import { ConflictError } from "../errors/conflict-error";
import { BadRequestError } from "../errors/bad-request-error";
import { JwtService } from "./jwt.service";
import { AuthUser, loginUser } from "../types/auth.types";
import { LoginUserDto } from "../dto/login-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { AuthRepository } from "../repositories/auth.repository";
import bcrypt from "bcrypt";

export class AuthService {
    private jwtService: JwtService;
    private authRepository: AuthRepository;

    private readonly saltRounds: number = 10;

    constructor() {
        this.jwtService = new JwtService();
        this.authRepository = new AuthRepository();
    }

    async register(newUser: CreateUserDto): Promise<AuthUser> {
        const existingUser = await this.authRepository.getByUsername(
            newUser.username,
        );

        if (existingUser) {
            throw new ConflictError("User with this username is already exist");
        }

        const salt = await bcrypt.genSalt(this.saltRounds);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);

        const created = await this.authRepository.create({
            username: newUser.username,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = created;

        return userWithoutPassword;
    }

    async login(user: LoginUserDto): Promise<loginUser> {
        const loginUser = await this.authRepository.getByUsername(
            user.username,
        );

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

        const updatedUser = await this.authRepository.updateRefreshToken(
            loginUser.id,
            refreshToken,
        );

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            role: updatedUser.role,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<string> {
        const user = await this.authRepository.getByRefreshToken(refreshToken);

        if (!user) {
            throw new BadRequestError("Invalid refresh token");
        }

        const payload: AuthUser = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const accessToken = this.jwtService.setAccessToken(payload);

        return accessToken;
    }
}
