import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import MessageModel, { CreateValidator, Delegate, EditValidator, MultiSend, Send, Undelegate, Value } from './message';
import AmountModel from './amount';

class TransactionsModel {
    height?: string;

    hash?: string;

    amount?: AmountModel;

    success = false;

    @Expose({ name: 'gas_wanted' })
    gasWanted?: number;

    @Expose({ name: 'gas_used' })
    gasUsed?: number;

    addresses: string[] = [];

    memo?: string;

    time?: string;

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
