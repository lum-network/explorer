import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { KpiModel, LumModel, ParamsModel, CoinModel } from 'models';
import { plainToClass } from 'class-transformer';
import ExplorerApi from 'api';

interface CoreState {
    kpi: KpiModel;
    lum: LumModel;
    params: ParamsModel;
    assets: CoinModel[];
}

const core = createModel<RootModel>()({
    state: {
        kpi: plainToClass(KpiModel, null),
        params: plainToClass(ParamsModel, null),
        lum: plainToClass(LumModel, null),
        assets: [],
    } as CoreState,
    reducers: {
        SET_KPI(state, kpi: KpiModel) {
            return {
                ...state,
                kpi,
            };
        },

        SET_LUM(state, lum: LumModel) {
            return {
                ...state,
                lum,
            };
        },

        SET_PARAMS(state, params: ParamsModel) {
            return {
                ...state,
                params,
            };
        },

        SET_ASSETS(state, assets: CoinModel[]) {
            return {
                ...state,
                assets,
            };
        },
    },
    effects: (dispatch) => {
        const client = ExplorerApi;

        return {
            async getKpi() {
                const [kpi] = await client.getKpi();

                console.log(kpi);

                dispatch.core.SET_KPI(kpi);
            },

            async getLum() {
                const [lum] = await client.getLum();

                dispatch.core.SET_LUM(lum);
            },

            async getParams() {
                const [params] = await client.getParams();

                dispatch.core.SET_PARAMS(params);
            },

            async getAssets() {
                const [assets] = await client.getAssets();

                dispatch.core.SET_ASSETS(assets);
            },
        };
    },
});

export default core;
