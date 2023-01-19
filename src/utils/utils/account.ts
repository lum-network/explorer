import { CoinModel } from 'models';
import { UnbondingModel } from 'models/models/account';
import { LumConstants } from '@lum-network/sdk-javascript';
import { NumbersUtils } from '../index';

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

export const processingAssets = (balances: CoinModel[], totalLum: number) => {
    return balances.map((balance) => {
        if (balance.denom === LumConstants.MicroLumDenom) {
            return { ...balance, amount: totalLum };
        } else {
            return { ...balance, amount: NumbersUtils.convertUnitNumber(balance.amount) };
        }
    });
};
