export const trunc = (str: string): string => {
    if (str.length > 14) {
        const start = str.slice(0, 6);
        const end = str.slice(-6);

        return `${start}...${end}`;
    }

    return str;
};
