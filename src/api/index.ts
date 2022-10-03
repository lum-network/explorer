import * as ApiSearch from './api/search';
import * as ApiGovernance from './api/governance';

import { HttpClient } from 'utils';
import { ApiConstants, ChartTypes } from 'constant';
import { AccountModel, BeamModel, BlocksModel, CoinModel, DelegationModel, LumModel, ParamsModel, TransactionsModel, ValidatorModel, KpiModel, ChartDataModel } from 'models';
import { RedelegationModel, UnbondingModel } from '../models/models/account';
import moment from 'moment';

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

    public getParams = () => this.request<ParamsModel>({ url: ApiConstants.PARAMETERS_URL }, ParamsModel);

    public getAssets = () => this.request<CoinModel[]>({ url: ApiConstants.ASSETS_URL }, CoinModel);

    public getKpi = () => this.request<KpiModel>({ url: ApiConstants.KPI_URL }, KpiModel);

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

    public fetchValidatorBlocks = (id: string, page = 0) => this.request<BlocksModel[]>({ url: `${ApiConstants.VALIDATORS_URL}/${id}/${ApiConstants.BLOCKS_URL}?limit=5&page=${page}` }, BlocksModel);

    public fetchValidatorDelegations = (id: string, page = 0) =>
        this.request<DelegationModel[]>({ url: `${ApiConstants.VALIDATORS_URL}/${id}/${ApiConstants.DELEGATIONS_URL}?limit=5&page=${page}` }, DelegationModel);

    // Accounts

    public getAccount = (address: string) => this.request<AccountModel>({ url: `${ApiConstants.ACCOUNTS_URL}/${address}` }, AccountModel);

    public fetchAccountDelegations = (address: string, page = 0) =>
        this.request<DelegationModel[]>({ url: `${ApiConstants.ACCOUNTS_URL}/${address}/${ApiConstants.DELEGATIONS_URL}?limit=5&page=${page}` }, DelegationModel);

    public fetchAccountTransactions = (address: string, page = 0) =>
        this.request<TransactionsModel[]>({ url: `${ApiConstants.ACCOUNTS_URL}/${address}/${ApiConstants.TRANSACTIONS_URL}?limit=10&page=${page}` }, TransactionsModel);

    public fetchAccountRedelegations = (address: string) => this.request<RedelegationModel[]>({ url: `${ApiConstants.ACCOUNTS_URL}/${address}/${ApiConstants.REDELEGATIONS_URL}` }, RedelegationModel);

    public fetchAccountUnbondings = (address: string) => this.request<UnbondingModel[]>({ url: `${ApiConstants.ACCOUNTS_URL}/${address}/${ApiConstants.UNBONDINGS_URL}` }, UnbondingModel);

    // Charts

    public postChart = (type: ChartTypes) =>
        this.request<ChartDataModel[]>(
            { url: `${ApiConstants.CHART_URL}`, method: 'POST', data: { type, end_at: moment().format('YYYY-MM-DD'), start_at: moment().day(-30).format('YYYY-MM-DD') } },
            Object,
        );
}

export default ExplorerApi.getInstance();

export { ApiSearch, ApiGovernance };
