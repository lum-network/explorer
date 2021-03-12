import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import AmountModel from './amount';

abstract class Base {
    type?: MessagesType;
}

export class Commission {
    @Expose({ name: 'max_change_rate' })
    maxChangeRate?: string;

    rate?: string;

    @Expose({ name: 'max_rate' })
    maxRate?: string;
}

export class Description {
    details = '-';

    identity = '-';

    moniker = '-';

    @Expose({ name: 'security_contact' })
    securityContact = '-';

    website = '-';
}

export class Send extends Base {
    @Expose({ name: 'from_address' })
    fromAddress?: string;

    @Expose({ name: 'to_address' })
    toAddress?: string;

    amount: AmountModel[] = [];
}

export class CreateValidator extends Base {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    pubkey?: string;

    @Expose({ name: 'min_self_delegation' })
    minSelfDelegation?: string;

    value?: AmountModel;

    @Type(() => Commission)
    commission: Commission = new Commission();

    @Type(() => Description)
    description: Description = new Description();
}

export class Delegate extends Base {}

export class Undelegate extends Base {}

export class EditValidator extends Base {}

export class MultiSend extends Base {}

export type Value = Send | CreateValidator | Delegate | Undelegate | EditValidator | MultiSend;

export class MessageModel {
    type?: MessagesType;

    @Type(() => Base, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: Send, name: MessagesType.SEND },
                { value: CreateValidator, name: MessagesType.CREATE_VALIDATOR },
                { value: Delegate, name: MessagesType.DELEGATE },
                { value: Undelegate, name: MessagesType.UNDELEGATE },
                { value: EditValidator, name: MessagesType.EDIT_VALIDATOR },
                { value: MultiSend, name: MessagesType.MULTI_SEND },
            ],
        },
        keepDiscriminatorProperty: true,
    })
    value: Value = {};
}
