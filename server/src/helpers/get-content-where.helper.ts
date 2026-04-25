import { IUser } from "../interfaces/user.interface";

export const getContentWhere = (user?: IUser) => {
    if (!user) return { isPublished: true };

    if (user.role === "ADMIN") return {};

    return {
        OR: [{ isPublished: true }, { userId: user.id }],
    };
};
