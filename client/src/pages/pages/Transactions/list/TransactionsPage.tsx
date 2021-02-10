import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { TransactionsList } from 'components';

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

        return <TransactionsList transactions={transactions} />;
    }
}

export default connect(mapState, mapDispatch)(TransactionsPage);
