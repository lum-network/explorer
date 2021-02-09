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
        setTransactions(state, transactions: TransactionsModel[]) {
            return {
                ...state,
                transactions,
            };
        },

        setTransaction(state, transaction: TransactionsModel) {
            return {
                ...state,
                transaction,
            };
        },

        resetTransaction(state) {
            return {
                ...state,
                transaction: plainToClass(TransactionsModel, {}),
            };
        },
    },
    effects: (dispatch) => ({
        async fetchTransactions() {
            const transactions = await ApiTransactions.fetchTransactions();

            dispatch.transactions.setTransactions(transactions);
        },

        async getTransaction(id: string, state) {
            // We reset "transaction" only when we request a different transaction
            if (state.transactions.transaction.hash !== id) {
                dispatch.transactions.resetTransaction();
            }

            const transaction = await ApiTransactions.getTransaction(id);

            dispatch.transactions.setTransaction(transaction);
        },
    }),
});

export default transactions;
