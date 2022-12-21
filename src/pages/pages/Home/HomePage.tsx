import React, { useEffect } from 'react';
import { BlocksList, Kpi, LineChart, TransactionsList } from 'components';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { KpiType } from 'constant';
import { i18n } from 'utils';

import Lum from './components/Lum/Lum';
import Lumki from './components/Lumki/Lumki';

const HomePage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();

    const blocks = useSelector((state: RootState) => state.blocks.blocks);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const assetValue = useSelector((state: RootState) => state.charts.assetValue);
    // const reviewsSum = useSelector((state: RootState) => state.charts.reviewsSum);
    // const rewardsSum = useSelector((state: RootState) => state.charts.rewardsSum);
    // const rewardsLast = useSelector((state: RootState) => state.charts.rewardsLast);
    // const rewardsSumCalendar = useSelector((state: RootState) => state.charts.rewardsSumCalendar);
    // const rewardsSumColumn = useSelector((state: RootState) => state.charts.rewardsSumColumn);

    const loadingAssetValue = useSelector((state: RootState) => state.loading.effects.charts.getAssetValue);
    // const loadingReviewsAndRewardsSum = useSelector((state: RootState) => state.loading.effects.charts.getReviewsAndRewardsSum);

    useEffect(() => {
        dispatch.charts.getAssetValue({ daysOffset: 7 }).finally(() => null);
        // dispatch.charts.getReviewsAndRewardsSum({ daysOffset: 30, groupType: ChartGroupType.DAILY }).finally(() => null);
        // dispatch.charts.getRewardsSumCalendar({ daysOffset: 30, groupType: ChartGroupType.DAILY }).finally(() => null);
        // dispatch.charts.getRewardsSumColumn({ daysOffset: 365, groupType: ChartGroupType.MONTHLY }).finally(() => null);
        // dispatch.charts.getRewardsLast().finally(() => null);
    }, []);

    if (!blocks || !transactions) {
        return null;
    }

    return (
        <div className="row mt-3 g-xxl-5 g-4">
            <div className="col-12">
                <Lum />
            </div>
            <div className="col-12 col-xxl-6">
                <Lumki />
            </div>
            <div className="col-12 col-xxl-6">
                <Lumki />
            </div>
            <div className="col-12">
                <h1 className="mb-2 placeholder-image">{i18n.t('overview')}</h1>
                <Kpi types={[KpiType.BLOCK_HEIGHT, KpiType.BLOCK_TIME, KpiType.BONDED_TOKEN, KpiType.INFLATION, KpiType.TOTAL_REVIEWS, KpiType.MERCHANTS, KpiType.REWARDS, KpiType.BEST_REWARD_EVER]} />
            </div>
            <div className="col-12">
                <h1 className="mb-2 placeholder-image">{i18n.t('lumsValue')}</h1>
                <LineChart timestamp yAxisTitle={[i18n.t('price')]} color={['#149CF577']} loading={loadingAssetValue} data={[assetValue]} />
            </div>
            {/*<h1 className="mb-2 placeholder-image">{i18n.t('rewards')}</h1>*/}
            {/*<div className="col-12 mb-3">*/}
            {/*    <Kpi types={[KpiType.REWARDS, KpiType.REWARD_AVERAGE, KpiType.BEST_REWARD_EVER, KpiType.BEST_REWARD_TODAY]} />*/}
            {/*</div>*/}
            {/*{!!(reviewsSum && reviewsSum.length && rewardsSum && rewardsSum.length) && (*/}
            {/*    <div className="col-12 mb-4 mb-xxl-5">*/}
            {/*        <LineChart*/}
            {/*            title={i18n.t('rewardsAndReviews')}*/}
            {/*            yAxisTitle={[i18n.t('reviews'), i18n.t('rewards')]}*/}
            {/*            color={['#FFC107', '#73ABFF']}*/}
            {/*            loading={loadingReviewsAndRewardsSum}*/}
            {/*            data={[reviewsSum, rewardsSum]}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{rewardsLast && rewardsLast.length > 0 && (*/}
            {/*    <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">*/}
            {/*        <LastRewards data={rewardsLast} />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{rewardsSumCalendar && (*/}
            {/*    <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">*/}
            {/*        <RewardsCalendar data={rewardsSumCalendar} />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{rewardsSumColumn && (*/}
            {/*    <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">*/}
            {/*        <ColumnChart data={rewardsSumColumn} />*/}
            {/*    </div>*/}
            {/*)}*/}
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
