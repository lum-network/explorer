import { ValidatorsModel } from 'models';

export const calculateTotalVotingPower = (validators: ValidatorsModel[]): number => {
    if (!validators || !validators.length) {
        return 0;
    }

    return validators.reduce((acc, validator) => acc + parseFloat(validator.tokens || '0'), 0);
};

export const findRank = (validators: ValidatorsModel[], validator: ValidatorsModel): number | null => {
    if (!validators || !validators.length || !validator) {
        return null;
    }

    const index = validators.findIndex((value) => value.operatorAddress === validator.operatorAddress);

    if (index === -1) {
        return null;
    }

    return index + 1;
};
