import { User } from "../../generated/prisma/client";

export const getContentWhere = (user?: User) => {
    if (!user) return { isPublished: true };

    if (user.role === "ADMIN") return {};

    return {
        OR: [{ isPublished: true }, { userId: user.id }],
    };
};
