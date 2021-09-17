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
        setValidators(state, validators: ValidatorsModel[]) {
            return {
                ...state,
                validators: validators.sort(
                    (a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10),
                ),
            };
        },

        setValidator(state, validator: ValidatorsModel) {
            return {
                ...state,
                validator,
            };
        },

        resetValidator(state) {
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

                dispatch.validators.setValidators(validators);
            } catch (e) {}
        },

        async getValidator(id: string) {
            dispatch.validators.resetValidator();

            try {
                const validator = await ApiValidators.getValidator(id);

                dispatch.validators.setValidator(validator);
            } catch (e) {}
        },
    }),
});

export default validators;
