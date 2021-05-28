import { CoinModel } from 'models';
import numeral from 'numeral';
import { LumConstants, LumUtils } from '@lum-network/sdk-javascript';

export const getPercentage = (nb: number, total: number): number => {
    if (!total) {
        return 0;
    }

    return (nb / total) * 100;
};

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const convertUnitNumber = (nb: number | string): number => {
    let amount = '';

    if (typeof nb === 'string') {
        const split = nb.split('.');
        amount = split[0];
    } else {
        amount = nb.toFixed();
    }

    const coin = {
        amount,
        denom: LumConstants.MicroLumDenom,
    };

    return parseFloat(LumUtils.convertUnit(coin, LumConstants.LumDenom));
};

export const formatNumber = (coin: CoinModel, moreDecimal?: boolean): string => {
    return smallerDecimal(
        numeral(LumUtils.convertUnit(coin, LumConstants.LumDenom)).format(moreDecimal ? '0,0.000000' : '0,0.000'),
    );
};

export const smallerDecimal = (nb: string): string => {
    const split = nb.split('.');

    if (split.length > 1) {
        return `${split[0]}<small>.${split[1]}</small>`;
    }

    return split[0];
};
