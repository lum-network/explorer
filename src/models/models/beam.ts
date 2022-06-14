import { Expose, Type } from 'class-transformer';
import CoinModel from './coin';

class BeamModel {
    // @Expose({ name: 'creator_address' })
    creatorAddress = '';

    @Expose()
    id?: string;

    @Expose()
    status?: number;

    @Expose()
    secret = '';

    // @Expose({ name: 'claim_address' })
    claimAddress?: string;

    // @Expose({ name: 'funds_withdrawn' })
    fundsWithdrawn?: boolean;

    @Expose()
    claimed?: boolean;

    // @Expose({ name: 'cancel_reason' })
    cancelReason?: string;

    // @Expose({ name: 'hide_content' })
    hideContent?: boolean;

    @Expose()
    schema = '';

    // @Expose({ name: 'claim_expires_at_block' })
    claimExpiresAtBlock?: number;

    // @Expose({ name: 'closes_at_block' })
    closesAtBlock?: number;

    @Expose()
    @Type(() => CoinModel)
    amount?: CoinModel;

    @Expose()
    data?: any;
}

export default BeamModel;
