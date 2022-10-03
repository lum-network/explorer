import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import ExplorerApi from 'api';
import { ChartTypes } from 'constant';
import { ChartDataModel } from 'models';

interface ChartsState {
    assetValue: ChartDataModel[] | null;
}

const charts = createModel<RootModel>()({
    state: {
        assetValue: null,
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
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getAssetValue() {
                const [assetValue] = await client.postChart(ChartTypes.ASSET_VALUE);

                dispatch.charts.SET_ASSET_VALUE(assetValue);
            },
        };
    },
});

export default charts;
