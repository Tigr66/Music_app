export const getYoutubeUrl = (url: string): string | null => {
    try {
        const parsedUrl = new URL(url);

        let videoId: string | null = null;

        if (parsedUrl.hostname.includes("youtu.be")) {
            videoId = parsedUrl.pathname.slice(1);
        } else if (parsedUrl.searchParams.has("v")) {
            videoId = parsedUrl.searchParams.get("v");
        } else if (parsedUrl.pathname.includes("/embed/")) {
            videoId = parsedUrl.pathname.split("/embed/")[1] ?? null;
        }

        if (!videoId) return null;

        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    } catch {
        return null;
    }
};
