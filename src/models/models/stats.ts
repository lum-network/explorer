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

    @Expose({ name: 'total_reviews' })
    totalReviews: number;

    @Expose({ name: 'total_merchants' })
    totalMerchants: number;

    @Expose({ name: 'total_rewards' })
    totalRewards: number;

    @Expose({ name: 'average_reward' })
    averageReward: number;

    @Expose({ name: 'best_reward_ever' })
    bestRewardEver: number;

    @Expose({ name: 'today_rewards' })
    todayRewards: number;

    @Expose({ name: 'validated_reviews' })
    validatedReviews: number;

    @Expose({ name: 'pending_reviews' })
    pendingReviews: number;

    @Expose({ name: 'rejected_reviews' })
    rejectedReviews: number;

    @Expose({ name: 'medias_number' })
    mediasNumber: number;
}

export default StatsModel;
