import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { TransactionsList } from 'components';
import transactionLogo from 'assets/images/transactionDark.svg';
import { i18n } from 'utils';

interface IProps {}

const mapState = (state: RootState) => ({
    transactions: state.transactions.transactions,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchTransactions: () => dispatch.transactions.fetchTransactions(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class TransactionsPage extends PureComponent<Props> {
    componentDidMount() {
        const { fetchTransactions } = this.props;

        fetchTransactions().finally(() => null);
    }

    render(): JSX.Element {
        const { transactions } = this.props;

        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="transaction" src={transactionLogo} /> {i18n.t('transactions')}
                </h2>
                <TransactionsList transactions={transactions} />
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(TransactionsPage);
