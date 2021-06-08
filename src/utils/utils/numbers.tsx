import React from 'react';
import { CoinModel } from 'models';
import numeral from 'numeral';
import { LumConstants, LumUtils } from '@lum-network/sdk-javascript';
import { SmallerDecimal } from 'components';

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
    let amount: string;

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

export const formatNumber = (coin: CoinModel, moreDecimal?: boolean): JSX.Element | null => {
    if (!coin) {
        return null;
    }

    if (!coin.denom) {
        coin.denom = LumConstants.MicroLumDenom;
    }

    return (
        <SmallerDecimal
            nb={numeral(LumUtils.convertUnit(coin, LumConstants.LumDenom)).format(
                moreDecimal ? '0,0.000000' : '0,0.000',
            )}
        />
    );
};
