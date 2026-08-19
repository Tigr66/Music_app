import { Request } from "express";

export type AuthUser = {
    id: string;
    username: string;
    role: string;
};

export type loginUser = {
    id: string;
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
};

export interface AuthRequest extends Request {
    user?: AuthUser;
}
