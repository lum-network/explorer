import { Expose } from 'class-transformer';

class DelegationModel {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    shares?: string;
}

export default DelegationModel;
