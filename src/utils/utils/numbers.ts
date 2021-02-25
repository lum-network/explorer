export const getPercentage = (nb: number, total: number): number => {
    if (!total) {
        return 0;
    }

    return (nb / total) * 100;
};

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};
