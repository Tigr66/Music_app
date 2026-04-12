export const formatTime = (time: number): string => {
    const seconds: number = Math.floor(time % 60);
    const minutes: number = Math.floor(time / 60);
    // const hours: number = Math.floor(time / 3600);

    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
};
