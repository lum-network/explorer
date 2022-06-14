import { ValidatorsModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import { ApiValidators } from 'api';

interface ValidatorsState {
    validators: ValidatorsModel[];
    validator: ValidatorsModel;
}

const validators = createModel<RootModel>()({
    state: {
        validators: [],
        validator: plainToClass(ValidatorsModel, null),
    } as ValidatorsState,
    reducers: {
        SET_VALIDATORS(state, validators: ValidatorsModel[]) {
            return {
                ...state,
                validators: validators.sort(
                    (a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10),
                ),
            };
        },

        SET_VALIDATOR(state, validator: ValidatorsModel) {
            return {
                ...state,
                validator,
            };
        },

        RESET_VALIDATOR(state) {
            return {
                ...state,
                validator: plainToClass(ValidatorsModel, null),
            };
        },
    },
    effects: (dispatch) => ({
        async fetchValidators() {
            try {
                const validators = await ApiValidators.fetchValidators();

                dispatch.validators.SET_VALIDATORS(validators);
            } catch (e) {}
        },

        async getValidator(id: string) {
            dispatch.validators.RESET_VALIDATOR();

            try {
                const validator = await ApiValidators.getValidator(id);

                dispatch.validators.SET_VALIDATOR(validator);
            } catch (e) {}
        },
    }),
});

export default validators;
