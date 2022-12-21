import ChartGroupType from './enums/ChartGroupType';

export type ChartOptions = {
    startAt?: string;
    endAt?: string;
    daysOffset?: number;
    groupType?: ChartGroupType;
};
