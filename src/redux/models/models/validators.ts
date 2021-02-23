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
                validators,
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
                validator: plainToClass(ValidatorsModel, {}),
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

        async getValidator(id: string, state) {
            // We reset "validator" only when we request a different validator
            if (state.validators.validator && state.validators.validator.operatorAddress !== id) {
                dispatch.validators.resetValidator();
            }

            try {
                const validator = await ApiValidators.getValidator(id);

                dispatch.validators.setValidator(validator);
            } catch (e) {}
        },
    }),
});

export default validators;
