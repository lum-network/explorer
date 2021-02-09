import React, { PureComponent } from 'react';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Table } from 'components';
import { TransactionsModel } from 'models';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import { NavigationConstants } from 'constant';
import { Strings } from 'utils';

interface IProps {}

const mapState = (state: RootState) => ({
    transactions: state.transactions.transactions,
});

type StateProps = ReturnType<typeof mapState>;
type Props = IProps & StateProps;

class TransactionsPage extends PureComponent<Props> {
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

export default connect(mapState)(TransactionsPage);
