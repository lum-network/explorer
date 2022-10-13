import React, { useEffect } from 'react';
import { BlocksList, ColumnChart, Kpi, LastRewards, LineChart, RewardsCalendar, TransactionsList } from 'components';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { KpiType } from 'constant';
import { ChartsUtils, i18n } from 'utils';

import Lum from './components/Lum/Lum';
import Lumki from './components/Lumki/Lumki';

const HomePage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const assetValue = useSelector((state: RootState) => state.charts.assetValue);
    const reviewsSum = useSelector((state: RootState) => state.charts.reviewsSum);
    const rewardsSum = useSelector((state: RootState) => state.charts.rewardsSum);
    const rewardsLast = useSelector((state: RootState) => state.charts.rewardsLast);
    const rewardsAvg = useSelector((state: RootState) => state.charts.rewardsAvg);

    const loadingAssetValue = useSelector((state: RootState) => state.loading.effects.charts.getAssetValue);
    const loadingReviewsAndRewardsSum = useSelector((state: RootState) => state.loading.effects.charts.getReviewsAndRewardsSum);

    useEffect(() => {
        dispatch.charts.getAssetValue().finally(() => null);
        dispatch.charts.getReviewsAndRewardsSum().finally(() => null);
        dispatch.charts.getRewardsAvg({ daysOffset: 365 }).finally(() => null);
        dispatch.charts.getRewardsLast().finally(() => null);
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
                <LineChart timestamp yAxisTitle={[i18n.t('price')]} color={['#149CF577']} loading={loadingAssetValue} data={[assetValue]} title={i18n.t('lumsValue')} />
            </div>
            <h1 className="mb-2 placeholder-image">{i18n.t('rewards')}</h1>
            <div className="col-12 mb-3">
                <Kpi types={[KpiType.REWARDS, KpiType.REWARD_AVERAGE, KpiType.BEST_REWARD_EVER, KpiType.BEST_REWARD_TODAY]} />
            </div>
            {reviewsSum && reviewsSum.length && rewardsSum && rewardsSum.length && (
                <div className="col-12 mb-4 mb-xxl-5">
                    <LineChart
                        yAxisTitle={[i18n.t('reviews'), i18n.t('rewards')]}
                        color={['#FFC107', '#73ABFF']}
                        loading={loadingReviewsAndRewardsSum}
                        data={[ChartsUtils.reduceChartToDaily(reviewsSum), ChartsUtils.reduceChartToDaily(rewardsSum)]}
                        title=""
                    />
                </div>
            )}
            {rewardsLast && rewardsLast.length > 0 && (
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <LastRewards data={rewardsLast} />
                </div>
            )}
            {rewardsAvg && (
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <RewardsCalendar data={ChartsUtils.reduceChartToDaily(rewardsAvg)} />
                </div>
            )}
            {rewardsAvg && (
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <ColumnChart data={ChartsUtils.reduceChartToMonthly(rewardsAvg).slice(-30)} />
                </div>
            )}
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <BlocksList more title blocks={blocks.slice(0, 5)} />
            </div>
            <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                <TransactionsList more title rej transactions={transactions.slice(0, 5)} />
            </div>
        </div>
    );
};

export default HomePage;
