import { MessagesType } from 'constant';
import { Expose, Type } from 'class-transformer';
import { MessageModel } from './message';
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

    name?: string;

    time?: string;

    @Type(() => MessageModel)
    messages: MessageModel[] = [];

    @Expose({ name: 'message_type' })
    messageType: MessagesType | null = null;

    @Expose({ name: 'messages_count' })
    messagesCount = 0;
}

export default TransactionsModel;
