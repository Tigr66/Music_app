import axios from "axios";

const BASE_URL: string = "http://localhost:8000";

export const musicApi = axios.create({
    baseURL: BASE_URL,
});
