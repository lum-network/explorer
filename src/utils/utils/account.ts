import { DelegationsModel } from 'models';

export const sumOfDelegations = (delegations: DelegationsModel[]): number => {
    return delegations.reduce((total, currentValue) => total + parseFloat(currentValue.balance?.amount || '0'), 0);
};
