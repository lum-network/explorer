import { Models } from '@rematch/core';
import blocks from './models/blocks';
import transactions from './models/transactions';
import validators from './models/validators';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
    transactions: typeof transactions;
    validators: typeof validators;
}

const models: RootModel = {
    blocks,
    transactions,
    validators,
};

export default models;
