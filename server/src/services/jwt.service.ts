import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth.types";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { InternalServerError } from "../errors/internal-server-error";

export class JwtService {
    private accessSecret: string;
    private refreshSecret: string;

    constructor() {
        const secretAccess = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!secretAccess) {
            throw new InternalServerError(
                "There is no secret key for the access token",
            );
        }
        if (!refreshSecret) {
            throw new InternalServerError(
                "There is no secret key for the refresh token",
            );
        }
        this.accessSecret = secretAccess;
        this.refreshSecret = refreshSecret;
    }

    setAccessToken(payload: AuthUser) {
        return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
    }

    setRefreshToken(payload: AuthUser) {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
    }

    verifyAccessToken(token: string): AuthUser | null {
        try {
            return jwt.verify(token, this.accessSecret) as AuthUser;
        } catch {
            return null;
        }
    }

    verifyRefreshToken(token: string): AuthUser | null {
        try {
            return jwt.verify(token, this.refreshSecret) as AuthUser;
        } catch {
            throw new UnauthorizedError(
                "Refresh token is invalid, please login again",
            );
        }
    }
}
