import { TransactionsAction } from 'constant';
import { Expose } from 'class-transformer';

class TransactionsModel {
    height?: number;

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
    dispatched_at?: string;
}

export default TransactionsModel;
