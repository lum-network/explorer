import { RematchDispatch, RematchRootState, init } from '@rematch/core';
import models, { RootModel } from '../models';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';

type FullModel = ExtraModelsFromLoading<RootModel>;

const store = init<RootModel, FullModel>({
    models,
    plugins: [loadingPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;

export default store;
