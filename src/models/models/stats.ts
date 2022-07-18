import { Expose } from 'class-transformer';

class StatsModel {
    @Expose()
    inflation?: string;

    @Expose({ name: 'chain_id' })
    chainId = '';
}

export default StatsModel;
