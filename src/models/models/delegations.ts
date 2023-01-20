import { Expose } from 'class-transformer';
import CoinModel from "./coin";

class DelegationModel {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    shares?: string;

    balance?: CoinModel;
}

export default DelegationModel;
