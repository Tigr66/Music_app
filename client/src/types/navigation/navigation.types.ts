import type { ComponentType } from "react";
import type { AccessRole } from "../auth/auth.types";

export type NavItem = {
    path: string;
    label: string;
    icon: ComponentType;
    roles: AccessRole[];
};
