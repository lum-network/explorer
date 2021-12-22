import * as ApiBlocks from './api/blocks';
import * as ApiTransactions from './api/transactions';
import * as ApiAccounts from './api/accounts';
import * as ApiValidators from './api/validators';
import * as ApiSearch from './api/search';
import * as ApiStats from './api/stats';
import * as ApiGovernance from './api/governance';
import { HttpClient } from 'utils';
import { ApiConstants } from 'constant';
import { LumModel } from 'models';

class ExplorerApi extends HttpClient {
    private static instance?: ExplorerApi;

    private constructor() {
        super(ApiConstants.BASE_URL);
    }

    public static getInstance(): ExplorerApi {
        if (!this.instance) {
            this.instance = new ExplorerApi();
        }

        return this.instance;
    }

    public getLum = () => this.request<LumModel>({ url: ApiConstants.LUM_URL }, LumModel);
}

export default ExplorerApi.getInstance();

export { ApiBlocks, ApiTransactions, ApiAccounts, ApiValidators, ApiSearch, ApiStats, ApiGovernance };
