import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Commission, Description } from './message';
import { ValidatorsType } from 'constant';

class ValidatorModel {
    @Expose({ name: 'operator_address' })
    operatorAddress?: string;

    jailed = false;

    tokens?: string;

    @Expose({ name: 'delegator_shares' })
    delegatorShares?: string;

    @Type(() => Description)
    description: Description = new Description();

    @Type(() => Commission)
    @Transform(({ value }) => {
        if (!value || !value.commission_rates) {
            return new Commission();
        }

        return plainToClass(Commission, value.commission_rates);
    })
    commission: Commission = new Commission();

    status?: ValidatorsType;
}

export default ValidatorModel;
