import { ValidatorModel } from 'models';
import { ValidatorsType } from 'constant';

export const calculateTotalVotingPower = (validators: ValidatorModel[]): number => {
    if (!validators || !validators.length) {
        return 0;
    }

    return validators.reduce((acc, validator) => acc + parseFloat(validator.status === ValidatorsType.ACTIVE ? validator.tokens || '0' : '0'), 0);
};

export const findRank = (validators: ValidatorModel[], validator: ValidatorModel): number | null => {
    if (!validators || !validators.length || !validator) {
        return null;
    }

    const index = validators.findIndex((value) => value.operatorAddress === validator.operatorAddress);

    if (index === -1) {
        return null;
    }

    return index + 1;
};
