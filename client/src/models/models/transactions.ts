import { TransactionsAction } from 'constant';
import { Expose } from 'class-transformer';

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
}

export default TransactionsModel;
