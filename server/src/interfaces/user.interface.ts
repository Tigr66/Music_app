import { Role } from "../../generated/prisma/client";

export interface IUser {
    id: number;
    username: string;
    password: string;
    token?: string | null;
    role: Role;
}
