import { DelegationsModel } from 'models';
import { UnbondingModel } from 'models/models/account';

export const sumOfDelegations = (delegations: DelegationsModel[]): number => {
    return delegations.reduce((total, currentValue) => total + parseFloat(currentValue.balance?.amount || '0'), 0);
};

export const sumOfUnbonding = (unbondings: UnbondingModel[]): number => {
    const array =
        unbondings &&
        unbondings.map((value) =>
            value.entries.reduce(
                (totalEntries, valueEntries) => totalEntries + parseFloat(valueEntries.balance || ''),
                0,
            ),
        );

    if (!array) {
        return 0;
    }

    return array.reduce((total, array) => total + array, 0);
};
