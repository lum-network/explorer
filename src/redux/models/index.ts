import { Models } from '@rematch/core';
import blocks from './models/blocks';
import transactions from './models/transactions';
import validators from './models/validators';
import accounts from './models/accounts';
import search from './models/search';
import core from './models/core';
import proposals from './models/proposals';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
    transactions: typeof transactions;
    validators: typeof validators;
    accounts: typeof accounts;
    search: typeof search;
    core: typeof core;
    proposals: typeof proposals;
}

const models: RootModel = {
    blocks,
    transactions,
    validators,
    accounts,
    search,
    core,
    proposals,
};

export default models;
