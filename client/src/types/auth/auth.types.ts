export type UserRole = "USER" | "ADMIN";

export type AuthUser = {
    id: string;
    username: string;
    role: UserRole;
};

export type AuthResponse = {
    id: string;
    username: string;
    role: UserRole;
    accessToken: string;
};
