export interface IUser {
    id: number;
    username: string;
    password: string;
    token?: string | null;
}
