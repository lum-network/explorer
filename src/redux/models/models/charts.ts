import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import ExplorerApi from 'api';
import { ChartOptions, ChartTypes } from 'constant';
import { ChartDataModel } from 'models';

interface ChartsState {
    assetValue: ChartDataModel[];
    reviewsSum: ChartDataModel[];
    rewardsSum: ChartDataModel[];
    rewardsSumCalendar: ChartDataModel[];
    rewardsSumColumn: ChartDataModel[];
    rewardsLast: ChartDataModel[];
}

const charts = createModel<RootModel>()({
    state: {
        assetValue: [],
        reviewsSum: [],
        rewardsSum: [],
        rewardsSumCalendar: [],
        rewardsSumColumn: [],
        rewardsLast: [],
    } as ChartsState,
    reducers: {
        SET_ASSET_VALUE(state, assetValue: ChartDataModel[]) {
            return {
                ...state,
                assetValue,
            };
        },
        RESET_ASSET_VALUE(state) {
            return {
                ...state,
                assetValue: [],
            };
        },
        SET_REVIEWS_SUM(state, reviewsSum: ChartDataModel[]) {
            return {
                ...state,
                reviewsSum,
            };
        },
        RESET_REVIEWS_SUM(state) {
            return {
                ...state,
                reviewsSum: [],
            };
        },
        SET_REWARDS_SUM(state, rewardsSum: ChartDataModel[]) {
            return {
                ...state,
                rewardsSum,
            };
        },
        RESET_REWARDS_SUM(state) {
            return {
                ...state,
                rewardsSum: [],
            };
        },
        SET_REWARDS_SUM_CALENDAR(state, rewardsSumCalendar: ChartDataModel[]) {
            return {
                ...state,
                rewardsSumCalendar: [...state.rewardsSumCalendar, ...rewardsSumCalendar],
            };
        },
        RESET_REWARDS_SUM_CALENDAR(state) {
            return {
                ...state,
                rewardsSumCalendar: [],
            };
        },
        SET_REWARDS_SUM_COLUMN(state, rewardsSumColumn: ChartDataModel[]) {
            return {
                ...state,
                rewardsSumColumn,
            };
        },
        RESET_REWARDS_SUM_COLUMN(state) {
            return {
                ...state,
                rewardsSumColumn: [],
            };
        },
        SET_REWARDS_LAST(state, rewardsLast: ChartDataModel[]) {
            return {
                ...state,
                rewardsLast,
            };
        },
        RESET_REWARDS_LAST(state) {
            return {
                ...state,
                rewardsLast: [],
            };
        },
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getAssetValue(options?: ChartOptions) {
                const [assetValue] = await client.postChart(ChartTypes.ASSET_VALUE, options);

                dispatch.charts.SET_ASSET_VALUE(assetValue);
            },

            async getReviewsAndRewardsSum(options?: ChartOptions) {
                const [[reviewsSum], [rewardsSum]] = await Promise.all([client.postChart(ChartTypes.REVIEWS_SUM, options), client.postChart(ChartTypes.REWARDS_SUM, options)]);

                dispatch.charts.SET_REVIEWS_SUM(reviewsSum);
                dispatch.charts.SET_REWARDS_SUM(rewardsSum);
            },

            async getRewardsSumCalendar(options: ChartOptions, state) {
                if (state.charts.rewardsSumCalendar.find((item) => item.key === options.startAt)) {
                    return;
                }


                const [rewardsSumCalendar] = await client.postChart(ChartTypes.REWARDS_SUM, options);

                dispatch.charts.SET_REWARDS_SUM_CALENDAR(rewardsSumCalendar);
            },

            async getRewardsSumColumn(options?: ChartOptions) {
                const [rewardsSumColumn] = await client.postChart(ChartTypes.REWARDS_SUM, options);

                dispatch.charts.SET_REWARDS_SUM_COLUMN(rewardsSumColumn);
            },

            async getRewardsLast() {
                const [rewardsLast] = await client.postChart(ChartTypes.REWARDS_LAST);

                dispatch.charts.SET_REWARDS_LAST(rewardsLast);
            },
        };
    },
});

export default charts;
