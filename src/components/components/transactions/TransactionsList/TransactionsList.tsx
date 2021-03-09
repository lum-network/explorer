import React, { PureComponent } from 'react';
import { TransactionsModel } from 'models';
import { MessageType } from 'components';
import { Table, Button, Card } from 'frontend-elements';
import { Badge } from 'components';
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
                        {StringsUtils.trunc(transaction.hash || '', rej ? 4 : 6)}
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
                    <small>{moment.utc(transaction.dispatchedAt).fromNow()}</small>
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
            <Card withoutPadding className="mb-5">
                <div className="d-flex justify-content-between">
                    {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('transactions')}</h3>}
                    {more && (
                        <Button
                            className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3"
                            onPress={() => history.push(NavigationConstants.TRANSACTIONS)}
                        >
                            View all
                        </Button>
                    )}
                </div>
                <Table head={rej ? simplified : full}>
                    {transactions.map((transaction, index) => this.renderRow(transaction, index, full))}
                </Table>
            </Card>
        );
    }
}

export default withRouter(TransactionsList);
