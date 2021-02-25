import { TimeConstants } from 'constant';

export const INTERVAL_IN_MS = TimeConstants.INTERVAL_TIME * 1000;

export const differenceBetweenDates = (dateStr1: string, dateStr2: string): number => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    return Math.abs(date2.getTime() - date1.getTime());
};
