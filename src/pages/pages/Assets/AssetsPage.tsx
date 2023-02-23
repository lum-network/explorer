import { AssetsList } from 'components';
import { Card } from 'frontend-elements';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { i18n, NumbersUtils } from 'utils';

const AssetsPage = (): JSX.Element => {
    const assets = useSelector((state: RootState) => state.core.assets);

    const head = [i18n.t('assetName'), i18n.t('totalSupply'), i18n.t('value')];

    return (
        <>
            <h2 className="mt-3 my-4">{i18n.t('assets')}</h2>
            <Card withoutPadding>
                <AssetsList head={head} assets={NumbersUtils.convertCoinsArrayToAssetsArray(assets)} />
            </Card>
        </>
    );
};

export default AssetsPage;
