import React, { PureComponent } from 'react';
import { TransactionsModel } from 'models';
import { Card, Table } from '../../../index';
import { Link } from 'react-router-dom';
import { NavigationConstants } from '../../../../constant';
import { Strings } from '../../../../utils';
import moment from 'moment-timezone';

interface IProps {
    transactions: TransactionsModel[];
}

class TransactionsList extends PureComponent<IProps> {
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

export default TransactionsList;
