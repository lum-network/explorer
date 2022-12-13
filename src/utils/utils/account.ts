import { CoinModel } from 'models';
import { UnbondingModel } from 'models/models/account';

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
