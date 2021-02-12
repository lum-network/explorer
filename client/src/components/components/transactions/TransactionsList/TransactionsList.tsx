import React, { PureComponent } from 'react';
import { TransactionsModel } from 'models';
import { Badge, Card, Table } from 'components';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import { i18n, StringsUtils } from 'utils';
import moment from 'moment-timezone';

interface IProps {
    transactions: TransactionsModel[];
    rej?: boolean;
    title?: boolean;
}

class TransactionsList extends PureComponent<IProps> {
    renderRow(transaction: TransactionsModel, index: number): JSX.Element {
        const { rej } = this.props;

        return (
            <tr key={index}>
                <td title={transaction.hash}>
                    <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                        {StringsUtils.trunc(transaction.hash || '')}
                    </Link>
                </td>
                <td>{transaction.action}</td>
                {!rej && (
                    <>
                        <td>
                            <Badge success={transaction.success} />
                        </td>
                        <td className="text-end">{transaction.amount}</td>
                    </>
                )}
                <td className="text-end">
                    <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                </td>
                <td className="text-end">{moment.utc(transaction.dispatchedAt).fromNow()}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { transactions, rej, title } = this.props;
        const full = ['Hash', 'Type', 'Status', 'Amount', 'Block', 'Time'];
        const simplified = ['Hash', 'Type', 'Block', 'Time'];

        return (
            <Card>
                {title && <h3>{i18n.t('transactions')}</h3>}
                <Table head={rej ? simplified : full}>
                    {transactions.map((transaction, index) => this.renderRow(transaction, index))}
                </Table>
            </Card>
        );
    }
}

export default TransactionsList;
