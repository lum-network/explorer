import { ValidatorModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import Api from 'api';

interface ValidatorsState {
    validators: ValidatorModel[];
    validator: ValidatorModel;
}

const validators = createModel<RootModel>()({
    state: {
        validators: [],
        validator: plainToClass(ValidatorModel, null),
    } as ValidatorsState,
    reducers: {
        SET_VALIDATORS(state, validators: ValidatorModel[]) {
            return {
                ...state,
                validators: validators.sort((a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10)),
            };
        },

        SET_VALIDATOR(state, validator: ValidatorModel) {
            return {
                ...state,
                validator,
            };
        },

        RESET_VALIDATOR(state) {
            return {
                ...state,
                validator: plainToClass(ValidatorModel, null),
            };
        },
    },
    effects: (dispatch) => ({
        async fetchValidators() {
            try {
                const [validators] = await Api.fetchValidators();

                dispatch.validators.SET_VALIDATORS(validators);
            } catch (e) {}
        },

        async getValidator(id: string) {
            dispatch.validators.RESET_VALIDATOR();

            try {
                const [validator] = await Api.getValidator(id);
                const [blocks] = await Api.fetchValidatorBlocks(id);
                const [delegations] = await Api.fetchValidatorDelegations(id);

                validator.blocks = blocks;
                validator.delegations = delegations;

                dispatch.validators.SET_VALIDATOR(validator);
            } catch (e) {}
        },
    }),
});

export default validators;
