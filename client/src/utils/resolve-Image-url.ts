import { musicApi } from "@/api/musicApi";

export function resolveImageUrl(imageUrl?: string): string | undefined {
    if (!imageUrl) return undefined;

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
        return imageUrl;

    const baseUrl = musicApi.defaults.baseURL ?? "http://localhost:8000";

    if (imageUrl.startsWith("/")) return `${baseUrl}${imageUrl}`;

    return `${baseUrl}/${imageUrl}`;
}
