import { ValidatorsModel } from 'models';

export const calculateTotalVotingPower = (validators: ValidatorsModel[]): number => {
    let total = 0;

    validators.forEach((value) => {
        total += parseFloat(value.delegatorShares || '0');
    });

    return total;
};
