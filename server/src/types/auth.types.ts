import { Request } from "express";
import { IUser } from "../interfaces/user.interface";

export interface AuthRequest extends Request {
    user?: IUser;
}
