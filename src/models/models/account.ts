import { Expose, Transform, Type } from 'class-transformer';
import TransactionsModel from './transactions';
import CoinModel from './coin';
import DelegationsModel from './delegations';
import Long from 'long';

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

    @Type(() => CoinModel)
    commissions: CoinModel[] = [];
}

export default AccountModel;
