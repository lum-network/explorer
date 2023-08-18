import { MessagesType, VotesOption } from 'constant';
import { Expose, Transform, Type } from 'class-transformer';
import CoinModel from './coin';
import Long from 'long';

export default abstract class MessageModel {
    @Expose({ name: 'type_url' })
    typeUrl?: MessagesType;
}

export class CommissionRates {
    @Expose({ name: 'max_change_rate' })
    maxChangeRate?: string;

    @Expose({ name: 'current_rate' })
    rate?: string;

    @Expose({ name: 'max_rate' })
    maxRate?: string;
}

export class Commission {
    @Expose({ name: 'last_updated_at' })
    lastUpdatedAt?: string;

    @Type(() => CommissionRates)
    rates: CommissionRates = new CommissionRates();
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

export class Vote2 extends MessageModel {
    @Type(() => VoteValue)
    value: VoteValue = new VoteValue();
}

class OpenBeamValue {
    id?: string;

    creator = '';

    amount?: CoinModel;

    secret = '';
}

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

export class WithdrawValidatorCommission extends MessageModel {
    @Type(() => WithdrawValidatorCommissionValue)
    value: WithdrawValidatorCommissionValue = new WithdrawValidatorCommissionValue();
}

class UnjailValue {
    @Expose({ name: 'validator_address' })
    validatorAddress?: string;
}

export class Unjail extends MessageModel {
    @Type(() => UnjailValue)
    value: UnjailValue = new UnjailValue();
}

class ExecValue {}

export class Exec extends MessageModel {
    @Type(() => ExecValue)
    value: ExecValue = new ExecValue();
}

class GrantValue {}

export class Grant extends MessageModel {
    @Type(() => GrantValue)
    value: GrantValue = new GrantValue();
}

class MillionsDepositValue {
    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    poolId: Long = new Long(0);

    @Expose()
    isSponsor?: boolean;

    @Expose()
    winnerAddress?: string;

    @Expose()
    depositorAddress?: string;

    @Expose()
    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();
}

export class MillionsDeposit extends MessageModel {
    @Type(() => MillionsDepositValue)
    value: MillionsDepositValue = new MillionsDepositValue();
}

class MillionsWithdrawValue {
    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    poolId: Long = new Long(0);

    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    depositId: Long = new Long(0);

    @Expose({ name: 'toAddress' })
    winnerAddress?: string;

    @Expose()
    depositorAddress?: string;
}

export class MillionsWithdraw extends MessageModel {
    @Type(() => MillionsWithdrawValue)
    value: MillionsWithdrawValue = new MillionsWithdrawValue();
}

class MillionsClaimPrizeValue {
    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    drawId: Long = new Long(0);

    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    poolId: Long = new Long(0);

    @Expose()
    @Transform(({ value }) => {
        return new Long(value.low, value.high, value.unsigned);
    })
    prizeId: Long = new Long(0);

    @Expose()
    winnerAddress?: string;
}

export class MillionsClaimPrize extends MessageModel {
    @Type(() => MillionsClaimPrizeValue)
    value: MillionsClaimPrizeValue = new MillionsClaimPrizeValue();
}

class SetWithdrawAddressValue {}

export class SetWithdrawAddress extends MessageModel {
    @Type(() => SetWithdrawAddressValue)
    value: SetWithdrawAddressValue = new SetWithdrawAddressValue();
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
    | Vote2
    | CreateVestingAccount
    | BeginRedelegate
    | WithdrawValidatorCommission
    | Unjail
    | Exec
    | Grant
    | MillionsDeposit
    | MillionsWithdraw
    | MillionsClaimPrize
    | SetWithdrawAddress;
