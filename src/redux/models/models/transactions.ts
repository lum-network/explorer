import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { TransactionsModel } from 'models';
import { ApiTransactions } from 'api';
import { plainToClass } from 'class-transformer';

interface TransactionsState {
    transactions: TransactionsModel[];
    transaction: TransactionsModel;
}

const transactions = createModel<RootModel>()({
    state: {
        transactions: [],
        transaction: plainToClass(TransactionsModel, null),
    } as TransactionsState,
    reducers: {
        SET_TRANSACTIONS(state, transactions: TransactionsModel[]) {
            return {
                ...state,
                transactions,
            };
        },

        SET_TRANSACTION(state, transaction: TransactionsModel) {
            return {
                ...state,
                transaction,
            };
        },

        RESET_TRANSACTION(state) {
            return {
                ...state,
                transaction: plainToClass(TransactionsModel, {}),
            };
        },

        ADD_NEW_TRANSACTION(state, transaction: TransactionsModel) {
            let newTransactions = state.transactions;

            newTransactions.unshift(transaction);
            newTransactions = [...new Set(newTransactions)];
            newTransactions.sort((a, b) => parseInt(b.height || '0', 10) - parseInt(a.height || '0', 10));

            return {
                ...state,
                transactions: newTransactions,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchTransactions() {
            try {
                const transactions = await ApiTransactions.fetchTransactions();

                dispatch.transactions.SET_TRANSACTIONS(transactions);
            } catch (e) {}
        },

        async getTransaction(id: string, state) {
            // We reset "transaction" only when we request a different transaction
            if (state.transactions.transaction && state.transactions.transaction.hash !== id) {
                dispatch.transactions.RESET_TRANSACTION();
            }

            try {
                const transaction = await ApiTransactions.getTransaction(id);

                dispatch.transactions.SET_TRANSACTION(transaction);
            } catch (e) {}
        },

        addTransaction(transaction: TransactionsModel) {
            dispatch.transactions.ADD_NEW_TRANSACTION(transaction);
        },
    }),
});

export default transactions;
