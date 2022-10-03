import React, { useEffect } from 'react';
import { BlocksList, Kpi, LineChart, TransactionsList } from 'components';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { KpiType } from 'constant';
import { i18n } from 'utils';

import Lum from './components/Lum/Lum';
import Lumki from './components/Lumki/Lumki';
import BestRewardedWallets from './components/Rewards/BestRewarded/BestRewardedWallets';
import LastRewards from './components/Rewards/LastRewards/LastRewards';
import RewardsCalendar from './components/Rewards/RewardsCalendar/RewardsCalendar';
import MerchantsOTW from './components/Reviews/MerchantsOTW';

const HomePage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const assetValue = useSelector((state: RootState) => state.charts.assetValue);

    const loadingAssetValue = useSelector((state: RootState) => state.loading.effects.charts.getAssetValue);

    useEffect(() => {
        dispatch.charts.getAssetValue().finally(() => null);
    }, []);

    if (!blocks || !transactions) {
        return null;
    }

    return (
        <div className="row mt-5">
            <div className="col-12 col-xxl-6 mb-4">
                <Lum />
            </div>
            <div className="col-12 col-xxl-6 mb-4">
                <Lumki />
            </div>
            <h1 className="my-2 placeholder-image">{i18n.t('overview')}</h1>
            <div className="col-12">
                <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME, KpiType.BONDED_TOKEN, KpiType.INFLATION, KpiType.TOTAL_REVIEWS, KpiType.MERCHANTS, KpiType.REWARDS, KpiType.BEST_REWARD_EVER]} />
            </div>
            <h1 className="mb-2 placeholder-image">{i18n.t('lumsValue')}</h1>
            <div className="col-12 mb-5">
                <LineChart color={'#149CF544'} loading={loadingAssetValue} data={assetValue} title={i18n.t('lumsValue')} />
            </div>
            <h1 className="mb-2 placeholder-image">{i18n.t('rewards')}</h1>
            <div className="col-12 mb-3">
                <Kpi types={[KpiType.REWARDS, KpiType.REWARD_AVERAGE, KpiType.BEST_REWARD_EVER, KpiType.BEST_REWARD_TODAY]} />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <BlocksList more title blocks={blocks.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <BestRewardedWallets />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <LastRewards />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <RewardsCalendar />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <MerchantsOTW />
            </div>
        </div>
    );
};

export default HomePage;
