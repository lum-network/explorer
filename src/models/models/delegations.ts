import AmountModel from './amount';
import { Expose } from 'class-transformer';

class DelegationsModel {
    balance?: AmountModel;

    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    shares?: string;
}

export default DelegationsModel;
