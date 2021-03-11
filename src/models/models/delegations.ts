import AmountModel from './amount';
import { Expose, Type } from 'class-transformer';

class DelegationsModel {
    balance?: AmountModel;

    @Type(() => SubDelegationModel)
    delegation: SubDelegationModel = new SubDelegationModel();
}

class SubDelegationModel {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    shares?: string;
}

export default DelegationsModel;
