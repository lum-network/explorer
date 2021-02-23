import { AccountModel } from 'models';
import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { plainToClass } from 'class-transformer';
import { ApiAccounts } from '../../../api';

interface AccountsState {
    account: AccountModel;
}

const accounts = createModel<RootModel>()({
    state: {
        account: plainToClass(AccountModel, null),
    } as AccountsState,
    reducers: {
        setAccount(state, account: AccountModel) {
            return {
                ...state,
                account,
            };
        },

        resetAccount(state) {
            return {
                ...state,
                account: plainToClass(AccountModel, null),
            };
        },
    },
    effects: (dispatch) => ({
        async getAccount(id: string, state) {
            // We reset "account" only when we request a different block
            if (state.accounts.account && state.accounts.account.address !== id) {
                dispatch.accounts.resetAccount();
            }

            try {
                const account = await ApiAccounts.getAccount(id);

                dispatch.accounts.setAccount(account);
            } catch (e) {}
        },
    }),
});

export default accounts;
