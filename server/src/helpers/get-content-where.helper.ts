import { AuthUser } from "../types/auth.types";

export const getContentWhere = (user?: AuthUser) => {
    if (!user) return { isPublished: true };

    if (user.role === "ADMIN") return {};

    return {
        OR: [{ isPublished: true }, { userId: user.id }],
    };
};
