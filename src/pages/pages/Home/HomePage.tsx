import React from 'react';
import { BlocksList, Kpi, LumsValueChart, TransactionsList } from 'components';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import Lum from './components/Lum/Lum';
import Lumki from './components/Lumki/Lumki';
import { KpiType } from 'constant';
import { i18n } from 'utils';

const HomePage = (): JSX.Element | null => {
    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);

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
                <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME, KpiType.BONDED_TOKEN, KpiType.INFLATION, KpiType.TOTAL_REVIEWS, KpiType.MERCHANTS, KpiType.REWARDS, KpiType.REWARDS_TODAY]} />
            </div>
            <h1 className="mb-2 placeholder-image">{i18n.t('lumsValue')}</h1>
            <div className="col-12 mb-5">
                <LumsValueChart />
            </div>
            <h1 className="mb-2 placeholder-image">{i18n.t('rewards')}</h1>
            <div className="col-12 mb-3">
                <Kpi types={[KpiType.REWARDS, KpiType.REWARD_AVERAGE, KpiType.BEST_REWARD_EVER, KpiType.REWARDS_TODAY]} />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <BlocksList more title blocks={blocks.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6 mb-5">
                <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
            </div>
        </div>
    );
};

export default HomePage;
