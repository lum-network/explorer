import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import MessageModel, {
    BeginRedelegate,
    ClaimBeam,
    CreateValidator,
    CreateVestingAccount,
    Delegate,
    Deposit,
    EditValidator,
    Exec,
    GetReward,
    Grant, MillionsClaimPrize,
    MillionsDeposit,
    MillionsWithdraw,
    MultiSend,
    OpenBeam,
    Send,
    SetWithdrawAddress,
    SubmitProposal,
    Undelegate,
    Unjail,
    UpdateBeam,
    Value,
    Vote,
    Vote2,
    WithdrawValidatorCommission,
} from './message';
import CoinModel from './coin';
import LogModel from './log';

class TransactionsModel {
    height?: string;

    hash?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();

    @Expose({ name: 'auto_claim_reward' })
    @Type(() => CoinModel)
    autoClaimReward?: CoinModel;

    success = false;

    @Expose({ name: 'gas_wanted' })
    gasWanted?: number;

    @Expose({ name: 'gas_used' })
    gasUsed?: number;

    addresses: string[] = [];

    memo?: string;

    time?: string;

    @Type(() => CoinModel)
    fees: CoinModel[] = [];

    @Type(() => MessageModel, {
        discriminator: {
            property: 'type_url',
            subTypes: [
                { value: Send, name: MessagesType.SEND },
                { value: CreateValidator, name: MessagesType.CREATE_VALIDATOR },
                { value: Delegate, name: MessagesType.DELEGATE },
                { value: Undelegate, name: MessagesType.UNDELEGATE },
                { value: EditValidator, name: MessagesType.EDIT_VALIDATOR },
                { value: MultiSend, name: MessagesType.MULTI_SEND },
                { value: GetReward, name: MessagesType.GET_REWARD },
                { value: OpenBeam, name: MessagesType.OPEN_BEAM },
                { value: UpdateBeam, name: MessagesType.UPDATE_BEAM },
                { value: ClaimBeam, name: MessagesType.CLAIM_BEAM },
                { value: SubmitProposal, name: MessagesType.SUBMIT_PROPOSAL },
                { value: Deposit, name: MessagesType.DEPOSIT },
                { value: Vote, name: MessagesType.VOTE },
                { value: CreateVestingAccount, name: MessagesType.CREATE_VESTING_ACCOUNT },
                { value: BeginRedelegate, name: MessagesType.BEGIN_REDELEGATE },
                { value: WithdrawValidatorCommission, name: MessagesType.WITHDRAW_VALIDATOR_COMMISSION },
                { value: Unjail, name: MessagesType.UNJAIL },
                { value: Exec, name: MessagesType.EXEC },
                { value: Grant, name: MessagesType.GRANT },
                { value: Vote2, name: MessagesType.VOTE2 },
                { value: MillionsDeposit, name: MessagesType.MILLIONS_DEPOSIT },
                { value: MillionsWithdraw, name: MessagesType.MILLIONS_WITHDRAW },
                { value: MillionsClaimPrize, name: MessagesType.MILLIONS_CLAIM_PRIZE },
                { value: SetWithdrawAddress, name: MessagesType.SET_WITHDRAW_ADDRESS },
            ],
        },
        keepDiscriminatorProperty: true,
    })
    messages: Value[] = [];

    @Expose({ name: 'message_type' })
    messageType: MessagesType | null = null;

    @Expose({ name: 'messages_count' })
    messagesCount = 0;

    @Expose({ name: 'raw_logs' })
    @Type(() => LogModel)
    rawLogs: LogModel[] = [];
}

export default TransactionsModel;
