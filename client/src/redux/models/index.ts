import { Models } from '@rematch/core';
import blocks from './models/blocks';
import transactions from './models/transactions';
import validators from './models/validators';
import accounts from './models/accounts';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
    transactions: typeof transactions;
    validators: typeof validators;
    accounts: typeof accounts;
}

const models: RootModel = {
    blocks,
    transactions,
    validators,
    accounts,
};

export default models;
