import { Expose, Type } from 'class-transformer';
import { Commission, Description } from './message';
import { ValidatorsType } from 'constant';
import BlocksModel from './blocks';
import DelegationsModel from './delegations';

class ValidatorModel {
    @Expose({ name: 'operator_address' })
    operatorAddress?: string;

    address?: string;

    @Expose({ name: 'self_bonded' })
    selfBonded = 0.0;

    genesis = false;

    jailed = false;

    tokens?: string;

    @Expose({ name: 'delegator_shares' })
    delegatorShares?: string;

    @Type(() => Description)
    description: Description = new Description();

    @Type(() => Commission)
    commission: Commission = new Commission();

    status?: ValidatorsType;

    @Type(() => BlocksModel)
    blocks: BlocksModel[] = [];

    @Type(() => DelegationsModel)
    delegations: DelegationsModel[] = [];
}

export default ValidatorModel;
