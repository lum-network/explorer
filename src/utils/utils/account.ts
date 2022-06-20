import { CoinModel, DelegationModel } from 'models';
import { UnbondingModel } from 'models/models/account';
import { NumberConstants } from 'constant';

export const sumOfDelegations = (delegations: DelegationModel[]): number => {
    return delegations.reduce((total, currentValue) => total + parseFloat(currentValue.shares || '0') / NumberConstants.CLIENT_PRECISION, 0);
};

export const sumOfUnbonding = (unbondings: UnbondingModel[]): number => {
    const array = unbondings && unbondings.map((value) => value.entries.reduce((totalEntries, valueEntries) => totalEntries + parseFloat(valueEntries.balance || ''), 0));

    if (!array) {
        return 0;
    }

    return array.reduce((total, array) => total + array, 0);
};

export const sumOfAirdrops = (airdrops: CoinModel[]): number => {
    return airdrops.reduce((total, value) => total + parseInt(value.amount), 0);
};
