import CoinModel from './coin';
import { Expose, Type } from 'class-transformer';

class DelegationsModel {
    @Type(() => CoinModel)
    balance: CoinModel = new CoinModel();

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
