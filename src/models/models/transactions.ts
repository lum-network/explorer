import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import MessageModel, {
    CreateValidator,
    Delegate,
    EditValidator,
    GetReward,
    MultiSend,
    Send,
    Undelegate,
    Value,
} from './message';
import CoinModel from './coin';

class TransactionsModel {
    height?: string;

    hash?: string;

    @Type(() => CoinModel)
    amount: CoinModel = new CoinModel();

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
            ],
        },
        keepDiscriminatorProperty: true,
    })
    messages: Value[] = [];

    @Expose({ name: 'message_type' })
    messageType: MessagesType | null = null;

    @Expose({ name: 'messages_count' })
    messagesCount = 0;
}

export default TransactionsModel;
