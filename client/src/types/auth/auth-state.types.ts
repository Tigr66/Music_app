import type { AuthUser } from "./auth-types";

export interface IAuthState {
    user: AuthUser | null;
    isSending: boolean;
}
