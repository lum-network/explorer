import { SmallerDecimal } from 'components';
import { Card, Table } from 'frontend-elements';
import { CoinModel } from 'models';
import numeral from 'numeral';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { i18n, NumbersUtils } from 'utils';

const AssetsPage = (): JSX.Element => {
    const assets = useSelector((state: RootState) => state.core.assets);

    const head = [i18n.t('assetName'), i18n.t('totalSupply')];

    const renderRow = (asset: CoinModel, index: number, head: string[]) => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>{asset.denom}</td>
                <td data-label={head[1]} className="text-end">
                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(asset.amount)).format('0,0.00')} />
                </td>
            </tr>
        );
    };

    return (
        <>
            <h2 className="mt-3 my-4">{i18n.t('assets')}</h2>
            <Card withoutPadding>
                <Table head={head}>{assets.map((asset, index) => renderRow(asset, index, head))}</Table>
            </Card>
        </>
    );
};

export default AssetsPage;
