import React, { useEffect } from 'react';
import { BlocksList, Kpi, LineChart, TransactionsList } from 'components';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { KpiType, NavigationConstants } from 'constant';
import { i18n } from 'utils';

import millionsImage from 'assets/images/millionsCard.png';

import Lum from './components/Lum/Lum';

const HomePage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const assetValue = useSelector((state: RootState) => state.charts.assetValue);

    const loadingAssetValue = useSelector((state: RootState) => state.loading.effects.charts.getAssetValue);

    useEffect(() => {
        dispatch.charts.getAssetValue({ daysOffset: 7 }).finally(() => null);
    }, []);

    if (!blocks || !transactions) {
        return null;
    }

    return (
        <div className="row mt-3 g-xxl-5 g-4">
            <div className="col-12 col-lg-6">
                <Lum />
            </div>
            <div className="col-12 col-lg-6">
                <a href={NavigationConstants.MILLIONS} target="_blank" rel="noreferrer" className="d-inline-block w-100 h-100" style={{ borderRadius: 15, overflow: 'hidden' }}>
                    <img src={millionsImage} alt="Cosmos Millions" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                </a>
            </div>
            <div className="col-12">
                <h1 className="mb-2 placeholder-image">{i18n.t('overview')}</h1>
                <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME, KpiType.BONDED_TOKEN, KpiType.INFLATION]} />
            </div>
            <div className="col-12">
                <h1 className="mb-2 placeholder-image">{i18n.t('lumsValue')}</h1>
                <LineChart timestamp yAxisTitle={[i18n.t('price')]} color={['#149CF577']} loading={loadingAssetValue} data={[assetValue]} />
            </div>
            <div className="col-12 col-xxl-6">
                <BlocksList more title blocks={blocks.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6">
                <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
            </div>
        </div>
    );
};

export default HomePage;
