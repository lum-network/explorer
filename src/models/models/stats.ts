import { Expose, Transform } from 'class-transformer';
import CoinModel from './coin';
import { LumConstants } from '@lum-network/sdk-javascript';

class StatsModel {
    @Expose()
    inflation?: string;

    @Expose({ name: 'chain_id' })
    chainId = '';

    @Expose({ name: 'total_supply' })
    @Transform(({ value }) => {
        if (!value || !value.length) {
            return undefined;
        }

        const res = value.find((val: CoinModel) => val.denom === LumConstants.MicroLumDenom);

        if (!res) {
            return undefined;
        }

        return res;
    })
    totalSupply?: CoinModel;
}

export default StatsModel;
