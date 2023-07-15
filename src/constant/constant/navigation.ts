import { IS_TESTNET } from './api';

export const HOME = '/home';
export const BLOCKS = '/blocks';
export const TRANSACTIONS = '/txs';
export const VALIDATORS = '/validators';
export const ACCOUNT = '/account';
export const BEAMS = '/beams';
export const PROPOSALS = '/proposals';
export const SEARCH = '/search';
export const PARAMETERS = '/parameters';
export const ASSETS = '/assets';

export const WALLET = `https://wallet.${IS_TESTNET ? 'testnet.' : ''}lum.network`;
export const GITHUB = 'https://github.com/lum-network/explorer';
export const SKEEPERS_REWARDS = 'https://rwd.skeepers.io';
export const DFRACT = 'https://dfract.lum.network';
export const DISCORD = 'https://discord.gg/KwyVvnBcXF';
export const GITHUB_ASSETS = 'https://github.com/lum-network/public-assets';
export const MILLIONS = 'https://cosmosmillions.com';
