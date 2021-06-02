import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import CoinModel from './coin';

export default abstract class MessageModel {
    @Expose({ name: 'type_url' })
    typeUrl?: MessagesType;
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

class SendValue {
    @Expose({ name: 'from_address' })
    fromAddress?: string;

    @Expose({ name: 'to_address' })
    toAddress?: string;

    @Type(() => CoinModel)
    amount: CoinModel[] = [];
}

export class Send extends MessageModel {
    @Type(() => SendValue)
    value: SendValue = new SendValue();
}

class CreateValidatorValue {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    pubkey?: string;

    @Expose({ name: 'min_self_delegation' })
    minSelfDelegation?: string;

    @Type(() => CoinModel)
    value: CoinModel = new CoinModel();

    @Type(() => Commission)
    commission: Commission = new Commission();

    @Type(() => Description)
    description: Description = new Description();
}

export class CreateValidator extends MessageModel {
    @Type(() => CreateValidatorValue)
    value: CreateValidatorValue = new CreateValidatorValue();
}

class DelegateValue {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();
}

export class Delegate extends MessageModel {
    @Type(() => DelegateValue)
    value: DelegateValue = new DelegateValue();
}

class UndelegateValue {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();
}

export class Undelegate extends MessageModel {
    @Type(() => UndelegateValue)
    value: UndelegateValue = new UndelegateValue();
}

class EditValidatorValue {}

export class EditValidator extends MessageModel {
    @Type(() => EditValidatorValue)
    value: EditValidatorValue = new EditValidatorValue();
}

class MultiSendSingleValue {
    address?: string;

    @Type(() => CoinModel)
    coins: CoinModel[] = [];
}

class MultiSendValue {
    @Type(() => MultiSendSingleValue)
    inputs: MultiSendSingleValue[] = [];

    @Type(() => MultiSendSingleValue)
    outputs: MultiSendSingleValue[] = [];
}

export class MultiSend extends MessageModel {
    @Type(() => MultiSendValue)
    value: MultiSendValue = new MultiSendValue();
}

class GetRewardValue {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();
}

export class GetReward extends MessageModel {
    @Type(() => GetRewardValue)
    value: GetRewardValue = new GetRewardValue();
}

export type Value = Send | CreateValidator | Delegate | Undelegate | EditValidator | MultiSend | GetReward;
