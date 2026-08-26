import { appRoutes } from "@/routes/app-routes";
import {
    CustomerServiceOutlined,
    FolderOutlined,
    HistoryOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { NavItem } from "@/types/navigation/navigation.types";

export const navItems: NavItem[] = [
    {
        path: appRoutes.TRACK_HISTORY_PAGE,
        label: "Track history",
        icon: HistoryOutlined,
        roles: ["ADMIN", "USER"],
    },
    {
        path: appRoutes.ADD_ARTIST_PAGE,
        label: "Add artist",
        icon: UserAddOutlined,
        roles: ["ADMIN", "USER"],
    },
    {
        path: appRoutes.ADD_ALBUM_PAGE,
        label: "Add album",
        icon: FolderOutlined,
        roles: ["ADMIN", "USER"],
    },
    {
        path: appRoutes.ADD_TRACK_PAGE,
        label: "Add track",
        icon: CustomerServiceOutlined,
        roles: ["ADMIN", "USER"],
    },
    {
        path: appRoutes.LOGIN_PAGE,
        label: "Login",
        icon: UserOutlined,
        roles: ["GUEST"],
    },
];
