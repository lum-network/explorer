import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import ExplorerApi from 'api';
import { ChartTypes } from 'constant';
import { ChartDataModel } from 'models';

interface ChartsState {
    assetValue: ChartDataModel[] | null;
    reviewsSum: ChartDataModel[] | null;
    rewardsSum: ChartDataModel[] | null;
    rewardsAvg: ChartDataModel[] | null;
    rewardsLast: ChartDataModel[] | null;
}

const charts = createModel<RootModel>()({
    state: {
        assetValue: null,
        reviewsSum: null,
        rewardsSum: null,
        rewardsAvg: null,
        rewardsLast: null,
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
                assetValue: null,
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
                reviewsSum: null,
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
                rewardsSum: null,
            };
        },
        SET_REWARDS_AVG(state, rewardsAvg: ChartDataModel[]) {
            return {
                ...state,
                rewardsAvg,
            };
        },
        RESET_REWARDS_AVG(state) {
            return {
                ...state,
                rewardsAvg: null,
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
                rewardsLast: null,
            };
        },
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getAssetValue() {
                const [assetValue] = await client.postChart(ChartTypes.ASSET_VALUE);

                dispatch.charts.SET_ASSET_VALUE(assetValue);
            },

            async getReviewsAndRewardsSum() {
                const [[reviewsSum], [rewardsSum]] = await Promise.all([client.postChart(ChartTypes.REVIEWS_SUM), client.postChart(ChartTypes.REWARDS_SUM)]);

                dispatch.charts.SET_REVIEWS_SUM(reviewsSum);
                dispatch.charts.SET_REWARDS_SUM(rewardsSum);
            },

            async getRewardsAvg(options?: { startAt?: Date; endAt?: Date; daysOffset?: number }) {
                const [rewardsAvg] = await client.postChart(ChartTypes.REWARDS_AVG, options);

                dispatch.charts.SET_REWARDS_AVG(rewardsAvg);
            },

            async getRewardsLast() {
                const [rewardsLast] = await client.postChart(ChartTypes.REWARDS_LAST);

                dispatch.charts.SET_REWARDS_LAST(rewardsLast);
            },
        };
    },
});

export default charts;
