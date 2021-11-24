import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import MessageModel, {
    BeginRedelegate,
    ClaimBeam,
    CreateValidator,
    Delegate,
    Deposit,
    EditValidator,
    GetReward,
    MultiSend,
    OpenBeam,
    Send,
    SubmitProposal,
    Undelegate,
    UpdateBeam,
    Value,
    Vote,
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
                { value: BeginRedelegate, name: MessagesType.BEGIN_REDELEGATE },
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
