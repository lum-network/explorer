import React from 'react';
import { TransactionsModel } from 'models';
import { MessageType } from 'components';
import { Table, Button, Card } from 'frontend-elements';
import { Badge } from 'components';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import { i18n, StringsUtils } from 'utils';
import moment from 'moment-timezone';
import moreLogo from 'assets/images/more.svg';
import numeral from 'numeral';

interface IProps extends RouteComponentProps {
    transactions: TransactionsModel[];
    rej?: boolean;
    title?: boolean;
    more?: boolean;
}

const TransactionsList = (props: IProps): JSX.Element => {
    const renderAmount = (transaction: TransactionsModel): JSX.Element => {
        if (transaction.messagesCount > 1) {
            return (
                <Link to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                    <span className="color-type me-1">{i18n.t('more')}</span>
                    <img src={moreLogo} alt="more" />
                </Link>
            );
        }

        return (
            <>
                {transaction.amount && numeral(transaction.amount.amount).format('0,0')}
                <span className="ms-1 color-type">
                    {transaction.amount && transaction.amount.denom ? transaction.amount.denom.toUpperCase() : 'LUM'}
                </span>
            </>
        );
    };

    const renderRow = (transaction: TransactionsModel, index: number, head: string[]): JSX.Element => {
        const { rej } = props;

        return (
            <tr key={index}>
                <td data-label={head[0]} title={transaction.hash}>
                    <Link title={transaction.hash} to={`${NavigationConstants.TRANSACTIONS}/${transaction.hash}`}>
                        {StringsUtils.trunc(transaction.hash || '', rej ? 4 : 6)}
                    </Link>
                </td>
                <td data-label={head[1]}>
                    <MessageType badge type={transaction.messageType} />
                    {transaction.messagesCount > 1 && (
                        <span className="ms-1 color-type">+{transaction.messagesCount - 1}</span>
                    )}
                </td>
                {!rej && (
                    <>
                        <td data-label={head[2]}>
                            <Badge success={transaction.success} />
                        </td>
                        <td data-label={head[3]} className="text-end">
                            {renderAmount(transaction)}
                        </td>
                    </>
                )}
                <td data-label={head[4]} className="text-end">
                    <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                </td>
                <td data-label={head[5]} className="text-end">
                    <small>{moment.utc(transaction.time).fromNow()}</small>
                </td>
            </tr>
        );
    };

    const { transactions, rej, title, more, history } = props;
    const full = [i18n.t('hash'), i18n.t('type'), i18n.t('status'), i18n.t('amount'), i18n.t('block'), i18n.t('time')];
    const simplified = [i18n.t('hash'), i18n.t('type'), i18n.t('block'), i18n.t('time')];

    return (
        <Card withoutPadding className="mb-5 h-100">
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
                {transactions.map((transaction, index) => renderRow(transaction, index, full))}
            </Table>
        </Card>
    );
};

export default withRouter(TransactionsList);
