export const BASE_URL = process.env.REACT_APP_BASE_URL || '';
export const IS_TESTNET =
    BASE_URL.includes('testnet') || BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1');

export const BLOCKS_URL = 'blocks';
export const TRANSACTIONS_URL = 'transactions';
export const VALIDATORS_URL = 'validators';
export const ACCOUNTS_URL = 'accounts';
export const SEARCH_URL = 'search';
export const STATS_URL = 'stats';
export const GOVERNANCE_URL = 'governance';
export const PROPOSALS_URL = 'proposals';
export const BEAMS_URL = 'beams';
export const LUM_URL = 'lum';
