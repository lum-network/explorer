import { Expose } from 'class-transformer';

class StatsModel {
    @Expose()
    inflation?: string;
}

export default StatsModel;
