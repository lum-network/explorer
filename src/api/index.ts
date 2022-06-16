import * as ApiAccounts from './api/accounts';
import * as ApiSearch from './api/search';
import * as ApiStats from './api/stats';
import * as ApiGovernance from './api/governance';
import { HttpClient } from 'utils';
import { ApiConstants } from 'constant';
import { BeamModel, BlocksModel, DelegationModel, LumModel, TransactionsModel, ValidatorModel } from 'models';

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

    // Core

    public getLum = () => this.request<LumModel>({ url: ApiConstants.LUM_URL }, LumModel);

    // Blocks

    public fetchBlocks = (page = 0) => this.request<BlocksModel[]>({ url: `${ApiConstants.BLOCKS_URL}?page=${page}` }, BlocksModel);

    public getBlock = (height: string) => this.request<BlocksModel>({ url: `${ApiConstants.BLOCKS_URL}/${height}` }, BlocksModel);

    // Transactions

    public fetchTransactions = (page = 0) => this.request<TransactionsModel[]>({ url: `${ApiConstants.TRANSACTIONS_URL}?page=${page}` }, TransactionsModel);

    public getTransaction = (hash: string) => this.request<TransactionsModel>({ url: `${ApiConstants.TRANSACTIONS_URL}/${hash}` }, TransactionsModel);

    // Beams

    public getBeam = (id: string) => this.request<BeamModel>({ url: `${ApiConstants.BEAMS_URL}/${id}` }, BeamModel);

    public fetchBeams = (page = 0) => this.request<BeamModel[]>({ url: `${ApiConstants.BEAMS_URL}?page=${page}` }, BeamModel);

    // Validators

    public fetchValidators = () => this.request<ValidatorModel[]>({ url: `${ApiConstants.VALIDATORS_URL}?limit=150` }, ValidatorModel);

    public getValidator = (id: string) => this.request<ValidatorModel>({ url: `${ApiConstants.VALIDATORS_URL}/${id}` }, ValidatorModel);

    public fetchValidatorBlocks = (id: string) => this.request<BlocksModel[]>({ url: `${ApiConstants.VALIDATORS_URL}/${id}/${ApiConstants.BLOCKS_URL}?limit=5` }, BlocksModel);

    public fetchValidatorDelegations = (id: string) => this.request<DelegationModel[]>({ url: `${ApiConstants.VALIDATORS_URL}/${id}/${ApiConstants.DELEGATIONS_URL}?limit=5` }, DelegationModel);
}

export default ExplorerApi.getInstance();

export { ApiAccounts, ApiSearch, ApiStats, ApiGovernance };
