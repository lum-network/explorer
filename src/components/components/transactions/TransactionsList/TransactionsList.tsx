import React, { PureComponent } from 'react';
import { TransactionsModel } from 'models';
import { Badge, Card, MessageType, Table, Button } from 'components';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import { i18n, StringsUtils } from 'utils';
import moment from 'moment-timezone';

interface IProps extends RouteComponentProps {
    transactions: TransactionsModel[];
    rej?: boolean;
    title?: boolean;
    more?: boolean;
}

class TransactionsList extends PureComponent<IProps> {
    renderRow(transaction: TransactionsModel, index: number, head: string[]): JSX.Element {
        const { rej } = this.props;

        return (
            <tr key={index}>
                <td data-label={head[0]} title={transaction.hash}>
                    <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                        {StringsUtils.trunc(transaction.hash || '')}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <MessageType badge type={transaction.action} />
                </td>
                {!rej && (
                    <>
                        <td data-label={head[2]}>
                            <Badge success={transaction.success} />
                        </td>
                        <td data-label={head[3]} className="text-end">
                            {transaction.amount}
                        </td>
                    </>
                )}
                <td data-label={head[4]} className="text-end">
                    <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                </td>
                <td data-label={head[5]} className="text-end">
                    {moment.utc(transaction.dispatchedAt).fromNow()}
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { transactions, rej, title, more, history } = this.props;
        const full = [
            i18n.t('hash'),
            i18n.t('type'),
            i18n.t('status'),
            i18n.t('amount'),
            i18n.t('block'),
            i18n.t('time'),
        ];
        const simplified = [i18n.t('hash'), i18n.t('type'), i18n.t('block'), i18n.t('time')];

        return (
            <Card className="mb-5">
                <div className="d-flex justify-content-between">
                    {title && <h3 className="mb-4">{i18n.t('transactions')}</h3>}
                    {more && <Button onPress={() => history.push(NavigationConstants.TRANSACTIONS)}>View all</Button>}
                </div>
                <Table head={rej ? simplified : full}>
                    {transactions.map((transaction, index) => this.renderRow(transaction, index, full))}
                </Table>
            </Card>
        );
    }
}

export default withRouter(TransactionsList);
