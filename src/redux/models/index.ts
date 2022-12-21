import { Models } from '@rematch/core';
import blocks from './models/blocks';
import transactions from './models/transactions';
import validators from './models/validators';
import accounts from './models/accounts';
import search from './models/search';
import core from './models/core';
import governance from './models/governance';
import beams from './models/beams';
import charts from './models/charts';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
    transactions: typeof transactions;
    validators: typeof validators;
    accounts: typeof accounts;
    search: typeof search;
    core: typeof core;
    governance: typeof governance;
    beams: typeof beams;
    charts: typeof charts;
}

const models: RootModel = {
    blocks,
    transactions,
    validators,
    accounts,
    search,
    core,
    governance,
    beams,
    charts,
};

export default models;
