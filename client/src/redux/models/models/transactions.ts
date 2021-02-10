import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { TransactionsModel } from 'models';
import { ApiTransactions } from 'api';
import { plainToClass } from 'class-transformer';
import moment from 'moment-timezone';

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

        addTransaction(state, transaction: TransactionsModel) {
            let newTransactions = state.transactions;

            newTransactions.unshift(transaction);
            newTransactions = [...new Set(newTransactions)];
            newTransactions.sort((a, b) => moment(b.dispatchedAt).date() - moment(a.dispatchedAt).date());

            return {
                ...state,
                transactions: newTransactions,
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

        addTransaction(transaction: TransactionsModel) {
            dispatch.transactions.addTransaction(transaction);
        },
    }),
});

export default transactions;
