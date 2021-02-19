import { Expose, Type } from 'class-transformer';
import TransactionsModel from './transactions';

class BlocksModel {
    @Expose({ name: 'chain_id' })
    chainId?: string;

    hash?: string;

    height?: string;

    @Expose({ name: 'dispatched_at' })
    dispatchedAt?: string;

    @Expose({ name: 'num_txs' })
    numTxs?: string;

    @Expose({ name: 'total_txs' })
    totalTxs?: number;

    @Expose({ name: 'proposer_address' })
    proposerAddress?: string;

    @Type(() => TransactionsModel)
    transactions: TransactionsModel[] = [];
}

export default BlocksModel;
