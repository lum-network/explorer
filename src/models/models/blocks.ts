import { Expose, Type } from 'class-transformer';
import TransactionsModel from './transactions';

class BlocksModel {
    @Expose({ name: 'chain_id' })
    chainId?: string;

    hash?: string;

    height?: string;

    time?: string;

    @Expose({ name: 'tx_count' })
    txCount?: string;

    @Expose({ name: 'operator_address' })
    operatorAddress?: string;

    @Type(() => TransactionsModel)
    transactions: TransactionsModel[] = [];
}

export default BlocksModel;
