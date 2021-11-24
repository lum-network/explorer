import { Expose } from 'class-transformer';
import CoinModel from './coin';

class StatsModel {
    @Expose()
    inflation?: string;

    @Expose({ name: 'chain_id' })
    chainId = '';

    @Expose({ name: 'total_supply' })
    totalSupply: CoinModel[] = [];
}

export default StatsModel;
