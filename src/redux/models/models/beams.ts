import { BeamModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';

interface BeamsState {
    beam: BeamModel;
}

const beams = createModel<RootModel>()({
    state: {
        beam: plainToClass(BeamModel, null),
    } as BeamsState,
    reducers: {},
    effects: (dispatch) => ({}),
});

export default beams;
