import { DelegationsModel } from 'models';

export const sumOfDelegations = (delegations: DelegationsModel[]): number => {
    let nb = 0.0;

    for (const delegation of delegations) {
        nb += parseFloat(delegation.shares || '0');
    }

    return nb;
};