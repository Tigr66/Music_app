import { Request } from "express";
import { IUser } from "../interfaces/user.interface";

export interface AuthUser {
    id: string;
    username: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: IUser;
}
