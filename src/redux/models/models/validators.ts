import { MetadataModel, ValidatorModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import Api from 'api';
import { ValidatorsType } from '../../../constant';

interface ValidatorsState {
    validators: ValidatorModel[];
    validatorsActive: ValidatorModel[];
    validatorsInactive: ValidatorModel[];
    validator: ValidatorModel;
    blocksMetadata?: MetadataModel;
    delegationsMetadata?: MetadataModel;
}

const validators = createModel<RootModel>()({
    state: {
        validators: [],
        validatorsActive: [],
        validatorsInactive: [],
        validator: plainToClass(ValidatorModel, null),
    } as ValidatorsState,
    reducers: {
        SET_VALIDATORS(state, validators: ValidatorModel[]) {
            return {
                ...state,
                validators: validators.sort((a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10)),
            };
        },

        SET_VALIDATORS_ACTIVE(state, validators: ValidatorModel[]) {
            return {
                ...state,
                validatorsActive: validators.sort((a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10)),
            };
        },

        SET_VALIDATORS_INACTIVE(state, validators: ValidatorModel[]) {
            return {
                ...state,
                validatorsInactive: validators.sort((a, b) => parseInt((b && b.tokens) || '0', 10) - parseInt((a && a.tokens) || '0', 10)),
            };
        },

        SET_VALIDATOR(state, validator: ValidatorModel, metadata: [MetadataModel | undefined, MetadataModel | undefined]) {
            const [blocksMetadata, delegationsMetadata] = metadata;

            return {
                ...state,
                validator,
                blocksMetadata,
                delegationsMetadata,
            };
        },

        RESET_VALIDATOR(state) {
            return {
                ...state,
                validator: plainToClass(ValidatorModel, null),
                blocksMetadata: undefined,
                delegationsMetadata: undefined,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchValidators() {
            try {
                const [validators] = await Api.fetchValidators();

                const activeValidators = validators.filter((validator) => validator.status === ValidatorsType.ACTIVE && !validator.jailed);
                const inactiveValidators = validators.filter((validator) => validator.status !== ValidatorsType.ACTIVE || validator.jailed);

                dispatch.validators.SET_VALIDATORS(validators);
                dispatch.validators.SET_VALIDATORS_ACTIVE(activeValidators);
                dispatch.validators.SET_VALIDATORS_INACTIVE(inactiveValidators);
            } catch (e) {}
        },

        async getValidator(id: string, state) {
            dispatch.validators.RESET_VALIDATOR();

            try {
                const [validator] = await Api.getValidator(id);

                dispatch.validators.SET_VALIDATOR(validator, [state.validators.blocksMetadata, state.validators.delegationsMetadata]);

                await dispatch.validators.fetchValidatorBlocks({ id, page: 0 });
                await dispatch.validators.fetchValidatorDelegations({ id, page: 0 });
            } catch (e) {}
        },

        async fetchValidatorBlocks({ id, page }: { id: string; page: number }, state) {
            const [blocks, blocksMetadata] = await Api.fetchValidatorBlocks(id, page);

            const validator = state.validators.validator;

            if (!validator) {
                return;
            }

            validator.blocks = blocks;

            dispatch.validators.SET_VALIDATOR(validator, [blocksMetadata, state.validators.delegationsMetadata]);
        },

        async fetchValidatorDelegations({ id, page }: { id: string; page: number }, state) {
            const [delegations, delegationsMetadata] = await Api.fetchValidatorDelegations(id, page);

            const validator = state.validators.validator;

            if (!validator) {
                return;
            }

            validator.delegations = delegations;

            dispatch.validators.SET_VALIDATOR(validator, [state.validators.blocksMetadata, delegationsMetadata]);
        },
    }),
});

export default validators;
