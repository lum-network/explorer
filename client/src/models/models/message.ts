import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';

abstract class Base {
    type?: MessagesType;
}

export class Send extends Base {
    @Expose({ name: 'from_address' })
    fromAddress?: string;

    @Expose({ name: 'to_address' })
    toAddress?: string;
}

export class CreateValidator extends Base {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;
}

export class Delegate extends Base {}

export class Undelegate extends Base {}

export class EditValidator extends Base {}

export type Value = Send | CreateValidator | Delegate | Undelegate | EditValidator;

export class MessageModel {
    type?: MessagesType;

    @Type(() => Base, {
        discriminator: {
            property: 'type',
            subTypes: [
                { value: Send, name: MessagesType.SEND },
                { value: CreateValidator, name: MessagesType.CREATE_VALIDATOR },
            ],
        },
        keepDiscriminatorProperty: true,
    })
    value: Value = {};
}
