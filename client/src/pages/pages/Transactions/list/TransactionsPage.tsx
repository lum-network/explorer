import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Table } from 'components';
import { TransactionsModel } from 'models';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import { NavigationConstants, SystemConstants } from 'constant';

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
    componentDidMount(): void {
        const { fetchTransactions } = this.props;

        fetchTransactions().finally(() => null);
    }

    renderRow(transaction: TransactionsModel): JSX.Element {
        return (
            <tr key={transaction.height}>
                <td>
                    <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>{transaction.hash}</Link>
                </td>
                <td>{`${moment.utc(transaction.dispatchedAt).fromNow()} (${moment
                    .utc(transaction.dispatchedAt)
                    .tz(SystemConstants.TIMEZONE)
                    .format('YYYY-MM-DD HH:mm:ss')})`}</td>
                <td>{transaction.action}</td>
                <td>{transaction.height}</td>
                <td>{transaction.fromAddress}</td>
                <td>{transaction.toAddress}</td>
                <td>{transaction.amount}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { transactions } = this.props;

        return (
            <Card>
                <h1>Transactions</h1>
                <Table head={['Hash', 'Time', 'Type', 'Block', 'From', 'To', 'Amount']}>
                    {transactions.map((transaction) => this.renderRow(transaction))}
                </Table>
            </Card>
        );
    }
}

export default connect(mapState, mapDispatch)(TransactionsPage);
