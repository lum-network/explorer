import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { MetadataModel, TransactionsModel } from 'models';
import { plainToClass } from 'class-transformer';
import Api from 'api';

interface TransactionsState {
    transactions: TransactionsModel[];
    transaction: TransactionsModel;
    metadata?: MetadataModel;
}

const transactions = createModel<RootModel>()({
    state: {
        transactions: [],
        transaction: plainToClass(TransactionsModel, null),
    } as TransactionsState,
    reducers: {
        SET_TRANSACTIONS(state, transactions: TransactionsModel[], metadata: MetadataModel) {
            return {
                ...state,
                transactions,
                metadata,
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
        async fetchTransactions(page?: number) {
            try {
                const [transactions, metadata] = await Api.fetchTransactions(page);

                dispatch.transactions.SET_TRANSACTIONS(transactions, metadata);
            } catch (e) {}
        },

        async getTransaction(id: string, state) {
            // We reset "transaction" only when we request a different transaction
            if (state.transactions.transaction && state.transactions.transaction.hash !== id) {
                dispatch.transactions.RESET_TRANSACTION();
            }

            try {
                const [transaction] = await Api.getTransaction(id);

                dispatch.transactions.SET_TRANSACTION(transaction);
            } catch (e) {}
        },

        addTransaction(transaction: TransactionsModel) {
            // FIXME
            // dispatch.transactions.ADD_NEW_TRANSACTION(transaction);
        },
    }),
});

export default transactions;
