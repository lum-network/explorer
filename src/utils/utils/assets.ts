import { CoinModel } from 'models';
import { LumConstants } from '@lum-network/sdk-javascript';
import { NumbersUtils } from '../index';

export const getTotalSupply = (assets: CoinModel[]): number => {
    const asset = assets.find((val: CoinModel) => val.denom === LumConstants.MicroLumDenom);

    return asset && asset.amount ? NumbersUtils.convertUnitNumber(asset.amount) : 0;
};
