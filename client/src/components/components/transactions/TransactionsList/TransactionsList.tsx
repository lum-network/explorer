import React, { PureComponent } from 'react';
import { TransactionsModel } from 'models';
import { Card, Table } from '../../../index';
import { Link } from 'react-router-dom';
import { NavigationConstants } from '../../../../constant';
import { Strings } from '../../../../utils';
import moment from 'moment-timezone';

interface IProps {
    transactions: TransactionsModel[];
    rej?: boolean;
}

class TransactionsList extends PureComponent<IProps> {
    renderRow(transaction: TransactionsModel, index: number): JSX.Element {
        const { rej } = this.props;

        return (
            <tr key={index}>
                <td title={transaction.hash}>
                    <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                        {Strings.trunc(transaction.hash || '')}
                    </Link>
                </td>
                <td>{transaction.action}</td>
                {!rej && (
                    <>
                        <td>{transaction.success ? 'Success' : 'Failure'}</td>
                        <td>{transaction.amount}</td>
                    </>
                )}
                <td>
                    <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                </td>
                <td>{moment.utc(transaction.dispatchedAt).fromNow()}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { transactions, rej } = this.props;
        const full = ['Hash', 'Type', 'Result', 'Amount', 'Block', 'Time'];
        const simplified = ['Hash', 'Type', 'Block', 'Time'];

        return (
            <Card>
                <h1>Transactions</h1>
                <Table head={rej ? simplified : full}>
                    {transactions.map((transaction, index) => this.renderRow(transaction, index))}
                </Table>
            </Card>
        );
    }
}

export default TransactionsList;
