import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { StatsModel } from 'models';
import { plainToClass } from 'class-transformer';
import { ApiStats } from 'api';

interface CoreState {
    stats: StatsModel;
}

const core = createModel<RootModel>()({
    state: {
        stats: plainToClass(StatsModel, {}),
    } as CoreState,
    reducers: {
        setStats(state, stats: StatsModel) {
            return {
                ...state,
                stats,
            };
        },
    },
    effects: (dispatch) => ({
        async getStats() {
            const stats = await ApiStats.getStats();

            dispatch.core.setStats(stats);
        },
    }),
});

export default core;
