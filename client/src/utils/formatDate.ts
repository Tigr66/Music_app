export const formatDate = (date: Date, time: boolean): string => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        ...(time && {
            hour: "numeric",
            minute: "numeric",
        }),
    }).format(date);
};
