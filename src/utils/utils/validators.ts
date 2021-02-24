import { ValidatorsModel } from 'models';
import { LumUtils } from '@lum-network/sdk-javascript';
import { AddressConstants } from 'constant';

export const calculateTotalVotingPower = (validators: ValidatorsModel[]): number => {
    let total = 0;

    if (!validators) {
        return 0;
    }

    validators.forEach((value) => {
        total += parseFloat(value.delegatorShares || '0');
    });

    return total;
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

export const convertValAddressToAccAddress = (address: string, prefix = AddressConstants.ACC_PREFIX): string => {
    const words = LumUtils.Bech32.decode(address).data;

    return LumUtils.Bech32.encode(prefix, words);
};
