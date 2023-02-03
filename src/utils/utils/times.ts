import { TimeConstants } from 'constant';

export const INTERVAL_IN_MS = TimeConstants.INTERVAL_TIME * 1000;

export const differenceBetweenDates = (dateStr1: string, dateStr2: string): number => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    return Math.abs(date2.getTime() - date1.getTime());
};

export const getDaysHoursMinutesSeconds = (time: number): [number, number, number, number] => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    console.log('seconds', time, seconds);

    return [days, hours, minutes, seconds];
};
