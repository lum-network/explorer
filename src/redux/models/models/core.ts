import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { StatsModel, LumModel, CoinModel } from 'models';
import { plainToClass } from 'class-transformer';
import ExplorerApi, { ApiStats } from 'api';

interface CoreState {
    stats: StatsModel;
    lum: LumModel;
    assets: CoinModel[];
}

const core = createModel<RootModel>()({
    state: {
        stats: plainToClass(StatsModel, null),
        lum: plainToClass(LumModel, null),
        assets: [],
    } as CoreState,
    reducers: {
        SET_STATS(state, stats: StatsModel) {
            return {
                ...state,
                stats,
            };
        },

        SET_LUM(state, lum: LumModel) {
            return {
                ...state,
                lum,
            };
        },

        SET_ASSETS(state, assets: CoinModel[]) {
            return {
                ...state,
                assets,
            };
        }
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getStats() {
                const stats = await ApiStats.getStats();

                dispatch.core.SET_STATS(stats);
            },

            async getLum() {
                const [lum] = await client.getLum();

                dispatch.core.SET_LUM(lum);
            },

            async getAssets() {
                const [assets] = await client.getAssets();

                dispatch.core.SET_ASSETS(assets);
            }
        };
    },
});

export default core;
