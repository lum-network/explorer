import { TransactionsAction } from 'constant';
import { deserializeArray, Expose, Transform, Type } from 'class-transformer';
import { MessageModel } from './message';

class TransactionsModel {
    height?: string;

    hash?: string;

    action?: TransactionsAction;

    amount?: string;

    success = false;

    @Expose({ name: 'gas_wanted' })
    gasWanted?: number;

    @Expose({ name: 'gas_used' })
    gasUsed?: number;

    @Expose({ name: 'from_address' })
    fromAddress?: string;

    @Expose({ name: 'to_address' })
    toAddress?: string;

    name?: string;

    @Expose({ name: 'dispatched_at' })
    dispatchedAt?: string;

    @Expose({ name: 'msgs' })
    @Type(() => MessageModel)
    @Transform(({ value }) => {
        if (!value) {
            return [];
        }

        return deserializeArray(MessageModel, value);
    })
    messages: MessageModel[] = [];
}

export default TransactionsModel;
