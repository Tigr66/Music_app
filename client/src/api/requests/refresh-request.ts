import axios from "axios";
import { BASE_URL } from "../musicApi";

export const refreshRequest = async (): Promise<string> => {
    try {
        const response = await axios.post<{ accessToken: string }>(
            `${BASE_URL}/auth/refresh`,
            {},
            {
                withCredentials: true,
            },
        );
        return response.data.accessToken;
    } catch (error) {
        throw new Error("Failed to refresh access token");
    }
};
