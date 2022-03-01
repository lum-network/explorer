import { BeamModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import Api from 'api';

interface BeamsState {
    beam: BeamModel;
}

const beams = createModel<RootModel>()({
    state: {
        beam: plainToClass(BeamModel, null),
    } as BeamsState,
    reducers: {
        SET_BEAM(state, beam: BeamModel) {
            return {
                ...state,
                beam,
            };
        },

        RESET_BEAM(state) {
            return {
                ...state,
                beam: plainToClass(BeamModel, null),
            };
        },
    },
    effects: (dispatch) => ({
        async getBeam(id: string) {
            const beam = await Api.getBeam(id);

            dispatch.beams.SET_BEAM(beam);
        },
    }),
});

export default beams;
