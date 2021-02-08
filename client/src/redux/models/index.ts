import { Models } from '@rematch/core';
import blocks from './models/blocks';
import transactions from './models/transactions';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
    transactions: typeof transactions;
}

const models: RootModel = {
    blocks,
    transactions,
};

export default models;
