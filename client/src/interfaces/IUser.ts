import type { UserRole } from "../types/UserRole";

export interface IUser {
    id: number;
    username: string;
    role: UserRole;
    token: string | null;
}
