import { Expose, Transform, Type } from 'class-transformer';
import TransactionsModel from './transactions';
import CoinModel from './coin';
import DelegationsModel from './delegations';
import Long from 'long';

class VestingModel {
    @Expose({ name: 'starts_at' })
    startsAt?: string;

    @Expose({ name: 'ends_at' })
    endsAt?: string;

    @Expose()
    time?: string;

    @Expose({ name: 'unlocked_percentage' })
    unlockedPercentage?: number;

    @Expose({ name: 'locked_percentage' })
    lockedPercentage?: number;

    @Expose({ name: 'total_coins' })
    totalCoins: CoinModel = new CoinModel();

    @Expose({ name: 'unlocked_coins' })
    unlockedCoins: CoinModel = new CoinModel();

    @Expose({ name: 'locked_coins' })
    lockedCoins: CoinModel = new CoinModel();

    @Expose({ name: 'locked_delegated_coins' })
    lockedDelegatedCoins: CoinModel = new CoinModel();

    @Expose({ name: 'locked_bank_coins' })
    lockedBankCoins: CoinModel = new CoinModel();
}

export class RewardModel {
    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    @Type(() => CoinModel)
    reward: CoinModel[] = [];
}

class AllRewards {
    @Type(() => CoinModel)
    total: CoinModel[] = [];

    @Type(() => RewardModel)
    rewards: RewardModel[] = [];
}

class UnbondingEntriesModel {
    balance = '0';

    @Expose({ name: 'completion_time' })
    completionTime?: string;

    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    height = new Long(0);
}

export class UnbondingModel {
    @Type(() => UnbondingEntriesModel)
    entries: UnbondingEntriesModel[] = [];

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;
}

class RedelegationEntryModel {
    @Expose({ name: 'completion_time' })
    completionTime?: string;
}

class RedelegationEntriesModel {
    @Expose()
    balance?: string;

    @Expose({ name: 'redelegation_entry' })
    @Type(() => RedelegationEntryModel)
    redelegationEntry: RedelegationEntryModel = new RedelegationEntryModel();
}

class RedelegationDetailsModel {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_src_address' })
    validatorSrcAddress?: string;

    @Expose({ name: 'validator_dst_address' })
    validatorDstAddress?: string;
}

export class RedelegationModel {
    @Expose()
    @Type(() => RedelegationDetailsModel)
    redelegation: RedelegationDetailsModel = new RedelegationDetailsModel();

    @Expose()
    @Type(() => RedelegationEntriesModel)
    entries: RedelegationEntriesModel[] = [];
}

class AccountModel {
    address?: string;

    @Expose({ name: 'public_key' })
    publicKey?: string;

    @Expose({ name: 'account_number' })
    accountNumber?: number;

    sequence?: number;

    @Expose({ name: 'withdraw_address' })
    withdrawAddress?: string;

    @Type(() => TransactionsModel)
    transactions: TransactionsModel[] = [];

    @Type(() => CoinModel)
    balance: CoinModel = new CoinModel();

    @Type(() => AllRewards)
    @Expose({ name: 'all_rewards' })
    allRewards: AllRewards = new AllRewards();

    @Type(() => DelegationsModel)
    delegations: DelegationsModel[] = [];

    @Type(() => UnbondingModel)
    unbondings: UnbondingModel[] = [];

    @Type(() => RedelegationModel)
    redelegations: RedelegationModel[] = [];

    @Type(() => CoinModel)
    commissions: CoinModel[] = [];

    @Type(() => VestingModel)
    vesting: VestingModel | null = null;
}

export default AccountModel;
