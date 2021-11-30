import { MessagesType, VotesOption } from 'constant';
import { Expose, Transform, Type } from 'class-transformer';
import CoinModel from './coin';
import Long from 'long';

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

class EditValidatorValue {
    @Expose({ name: 'validator_address' })
    validatorAddress?: string;

    @Type(() => Description)
    description: Description = new Description();
}

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

class SubmitProposalValue {
    @Expose({ name: 'proposer_address' })
    proposerAddress?: string;

    @Expose({ name: 'initial_deposit' })
    initialDeposit?: CoinModel[] = [];
}

export class SubmitProposal extends MessageModel {
    @Type(() => SubmitProposalValue)
    value: SubmitProposalValue = new SubmitProposalValue();
}

class DepositValue {
    @Expose({ name: 'proposal_id' })
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    proposalId = new Long(0);

    @Expose({ name: 'depositor_address' })
    depositorAddress = '';

    @Expose({ name: 'amount' })
    amount: CoinModel[] = [];
}

export class Deposit extends MessageModel {
    @Type(() => DepositValue)
    value: DepositValue = new DepositValue();
}

class VoteValue {
    @Expose({ name: 'proposal_id' })
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    proposalId = new Long(0);

    @Expose({ name: 'voter_address' })
    voterAddress = '';

    @Expose({ name: 'option' })
    option?: VotesOption;
}

export class Vote extends MessageModel {
    @Type(() => VoteValue)
    value: VoteValue = new VoteValue();
}

class OpenBeamValue {}

export class OpenBeam extends MessageModel {
    @Type(() => OpenBeamValue)
    value: OpenBeamValue = new OpenBeamValue();
}

class UpdateBeamValue {}

export class UpdateBeam extends MessageModel {
    @Type(() => UpdateBeamValue)
    value: UpdateBeamValue = new UpdateBeamValue();
}

class ClaimBeamValue {}

export class ClaimBeam extends MessageModel {
    @Type(() => ClaimBeamValue)
    value: ClaimBeamValue = new ClaimBeamValue();
}

class CreateVestingAccountValue {
    @Expose({ name: 'from_address' })
    fromAddress = '';

    @Expose({ name: 'to_address' })
    toAddress = '';

    @Expose({ name: 'end_time' })
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    endTime: Long = new Long(0);

    delayed?: boolean;

    amount: CoinModel[] = [];
}

export class CreateVestingAccount extends MessageModel {
    @Type(() => CreateVestingAccountValue)
    value: CreateVestingAccountValue = new CreateVestingAccountValue();
}

class BeginRedelegateValue {
    @Expose({ name: 'delegator_address' })
    delegatorAddress?: string;

    @Expose({ name: 'validator_src_address' })
    validatorSrcAddress?: string;

    @Expose({ name: 'validator_dst_address' })
    validatorDstAddress?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();
}

export class BeginRedelegate extends MessageModel {
    @Type(() => BeginRedelegateValue)
    value: BeginRedelegateValue = new BeginRedelegateValue();
}

class WithdrawValidatorCommissionValue {
    @Expose({ name: 'validator_address' })
    validatorAddress?: string;
}

export class WithdrawValidatorCommisssion extends MessageModel {
    @Type(() => WithdrawValidatorCommissionValue)
    value: WithdrawValidatorCommissionValue = new WithdrawValidatorCommissionValue();
}

export type Value =
    | Send
    | CreateValidator
    | Delegate
    | Undelegate
    | EditValidator
    | MultiSend
    | GetReward
    | OpenBeam
    | UpdateBeam
    | ClaimBeam
    | SubmitProposal
    | Deposit
    | Vote
    | CreateVestingAccount
    | BeginRedelegate
    | WithdrawValidatorCommisssion;
