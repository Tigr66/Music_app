export const formatTime = (time: number): string => {
    const seconds: number = Math.floor(time % 60);
    const minutes: number = Math.floor((time % 3600) / 60);
    const hours: number = Math.floor(time / 3600);

    const stringHours = hours.toString().padStart(2, "0");

    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    return hours >= 1 ? stringHours + timeString : timeString;
};
