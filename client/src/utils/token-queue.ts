let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const tokenQueue = async (
    refreshFn: () => Promise<string>,
): Promise<string> => {
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = refreshFn().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
    });

    return refreshPromise;
};
