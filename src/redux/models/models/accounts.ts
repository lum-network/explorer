import { AccountModel, MetadataModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import Api from 'api';

interface AccountsState {
    account: AccountModel;
    delegationsMetadata?: MetadataModel;
    transactionsMetadata?: MetadataModel;
}

const accounts = createModel<RootModel>()({
    state: {
        account: plainToClass(AccountModel, null),
    } as AccountsState,
    reducers: {
        SET_ACCOUNT(state, account: AccountModel, metadata: [MetadataModel | undefined, MetadataModel | undefined]) {
            const [delegationsMetadata, transactionsMetadata] = metadata;

            return {
                ...state,
                account,
                delegationsMetadata,
                transactionsMetadata,
            };
        },

        RESET_ACCOUNT(state) {
            return {
                ...state,
                account: plainToClass(AccountModel, null),
                delegationsMetadata: undefined,
                transactionsMetadata: undefined,
            };
        },
    },
    effects: (dispatch) => ({
        async getAccount(id: string, state) {
            // We reset "account" only when we request a different block
            if (state.accounts.account && state.accounts.account.address !== id) {
                dispatch.accounts.RESET_ACCOUNT();
            }

            try {
                const [account] = await Api.getAccount(id);

                dispatch.accounts.SET_ACCOUNT(account, [state.accounts.delegationsMetadata, state.accounts.transactionsMetadata]);

                await dispatch.accounts.fetchAccountDelegations({ id, page: 0 });
                await dispatch.accounts.fetchAccountTransactions({ id, page: 0 });
            } catch (e) {}
        },

        async fetchAccountDelegations({ id, page }: { id: string; page: number }, state) {
            const [delegations, delegationsMetadata] = await Api.fetchAccountDelegations(id, page);

            const account = state.accounts.account;

            if (!account) {
                return;
            }

            account.delegations = delegations;

            dispatch.accounts.SET_ACCOUNT(account, [delegationsMetadata, state.accounts.transactionsMetadata]);
        },

        async fetchAccountTransactions({ id, page }: { id: string; page: number }, state) {
            const [transactions, transactionsMetadata] = await Api.fetchAccountTransactions(id, page);

            const account = state.accounts.account;

            if (!account) {
                return null;
            }

            account.transactions = transactions;

            dispatch.accounts.SET_ACCOUNT(account, [state.accounts.delegationsMetadata, transactionsMetadata]);
        },
    }),
});

export default accounts;
