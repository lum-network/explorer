import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { StatsModel, LumModel } from 'models';
import { plainToClass } from 'class-transformer';
import ExplorerApi, { ApiStats } from 'api';

interface CoreState {
    stats: StatsModel;
    lum: LumModel;
}

const core = createModel<RootModel>()({
    state: {
        stats: plainToClass(StatsModel, null),
        lum: plainToClass(LumModel, null),
    } as CoreState,
    reducers: {
        setStats(state, stats: StatsModel) {
            return {
                ...state,
                stats,
            };
        },

        setLum(state, lum: LumModel) {
            return {
                ...state,
                lum,
            };
        },
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getStats() {
                const stats = await ApiStats.getStats();

                dispatch.core.setStats(stats);
            },

            async getLum() {
                const lum = await client.getLum();

                dispatch.core.setLum(lum);
            },
        };
    },
});

export default core;
