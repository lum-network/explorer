import { IS_TESTNET } from './api';

export const HOME = '/home';
export const BLOCKS = '/blocks';
export const TRANSACTIONS = '/txs';
export const VALIDATORS = '/validators';
export const ACCOUNT = '/account';
export const BEAMS = '/beams';
export const PROPOSALS = '/proposals';
export const SEARCH = '/search';
export const MERCHANTS = '/merchants';

export const WALLET = `https://wallet.${IS_TESTNET ? 'testnet.' : ''}lum.network`;
export const GITHUB = 'https://github.com/lum-network/explorer';
export const LUMKI = 'https://lumki.com';
export const DISCORD = 'https://discord.gg/KwyVvnBcXF';
export const GITHUB_ASSETS = 'https://github.com/lum-network/public-assets';
