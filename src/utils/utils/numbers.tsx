import React from 'react';
import { CoinModel } from 'models';
import numeral from 'numeral';
import { LumConstants, LumUtils } from '@lum-network/sdk-javascript';
import { SmallerDecimal } from 'components';
import { Asset } from 'components/components/AssetsList/AssetsList';

export const getPercentage = (nb: number, total: number): number => {
    if (!total) {
        return 0;
    }

    return (nb / total) * 100;
};

export const getDifferencePercentage = (nb1: number, nb2: number): number => {
    if (nb1 === 0) {
        return 0;
    }

    let sign = 1;

    if (nb1 > nb2) {
        sign = -1;
    }

    return (Math.abs(nb1 - nb2) / nb1) * sign;
};

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const convertUnitNumber = (nb: number | string): number => {
    let amount: string;

    if (!nb) {
        return 0;
    }

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

export const convertCoinsArrayToAssetsArray = (coins: CoinModel[]): Asset[] => {
    return coins.map((coin) => {
        return {
            denom: coin.denom,
            amount: convertUnitNumber(coin.amount),
        };
    });
};

export const formatNumber = (coin: CoinModel, moreDecimal?: boolean): JSX.Element | null => {
    if (!coin) {
        return <SmallerDecimal nb={'0'} />;
    }

    return <SmallerDecimal nb={numeral(convertUnitNumber(coin.amount)).format(moreDecimal ? '0,0.000000' : '0,0.000')} />;
};
