import React, { useEffect } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionsList } from 'components';
import transactionLogo from 'assets/images/transactionDark.svg';
import { i18n } from 'utils';

const TransactionsPage = (): JSX.Element | null => {
    const dispatch = useDispatch<Dispatch>();
    const transactions = useSelector((state: RootState) => state.transactions.transactions);

    useEffect(() => {
        dispatch.transactions.fetchTransactions().finally(() => null);
    });

    if (!transactions) {
        return null;
    }

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="transaction" src={transactionLogo} /> {i18n.t('transactions')}
            </h2>
            <TransactionsList transactions={transactions} />
        </>
    );
};

export default TransactionsPage;
