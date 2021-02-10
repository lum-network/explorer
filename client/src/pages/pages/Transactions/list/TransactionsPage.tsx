import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Table } from 'components';
import { TransactionsModel } from 'models';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import { NavigationConstants, SocketConstants } from 'constant';
import { Strings } from 'utils';
import Pusher from 'pusher-js';
import { plainToClass } from 'class-transformer';

interface IProps {}

const mapState = (state: RootState) => ({
    transactions: state.transactions.transactions,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchTransactions: () => dispatch.transactions.fetchTransactions(),
    addTransaction: (transaction: TransactionsModel) => dispatch.transactions.addTransaction(transaction),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class TransactionsPage extends PureComponent<Props> {
    pusher: Pusher | null = null;

    componentDidMount() {
        const { fetchTransactions, addTransaction } = this.props;

        fetchTransactions().finally(() => null);

        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '', {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        });

        const channel = this.pusher.subscribe(SocketConstants.TRANSACTIONS);

        channel.bind(SocketConstants.NEW_TRANSACTION_EVENT, (data: Record<string, unknown>) => {
            const transaction = plainToClass(TransactionsModel, data);

            addTransaction(transaction);
        });
    }

    componentWillUnmount() {
        if (this.pusher) {
            this.pusher.unsubscribe(SocketConstants.TRANSACTIONS);
        }
    }

    renderRow(transaction: TransactionsModel): JSX.Element {
        return (
            <tr key={transaction.height}>
                <td title={transaction.hash}>
                    <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                        {Strings.trunc(transaction.hash || '')}
                    </Link>
                </td>
                <td>{transaction.action}</td>
                <td>{transaction.success ? 'Success' : 'Failure'}</td>
                <td>{transaction.amount}</td>
                <td>
                    <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                </td>
                <td>{moment.utc(transaction.dispatchedAt).fromNow()}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { transactions } = this.props;

        return (
            <Card>
                <h1>Transactions</h1>
                <Table head={['Hash', 'Type', 'Result', 'Amount', 'Block', 'Time']}>
                    {transactions.map((transaction) => this.renderRow(transaction))}
                </Table>
            </Card>
        );
    }
}

export default connect(mapState, mapDispatch)(TransactionsPage);
