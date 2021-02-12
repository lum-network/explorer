import React, { PureComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge, Card } from 'components';
import moment from 'moment-timezone';
import { NavigationConstants, SystemConstants } from 'constant';
import { i18n, MessagesUtils, StringsUtils } from 'utils';
import { MessageModel } from 'models';
import blockLogo from 'assets/images/blockDark.svg';
import transactionLogo from 'assets/images/transactionDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import gasLogo from 'assets/images/gasDark.svg';
import hashLogo from 'assets/images/hashDark.svg';
import searchLogo from 'assets/images/searchDark.svg';
import feeLogo from 'assets/images/feeDark.svg';
import memoLogo from 'assets/images/memoDark.svg';

interface IProps extends RouteComponentProps<{ id: string }> {}

const mapState = (state: RootState) => ({
    transaction: state.transactions.transaction,
    loading: state.loading.effects.transactions.getTransaction,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getTransaction: (id: string) => dispatch.transactions.getTransaction(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class TransactionPage extends PureComponent<Props> {
    componentDidMount(): void {
        const { getTransaction } = this.props;
        const { id } = this.props.match.params;

        getTransaction(id).finally(() => null);
    }

    renderMessage(value: MessageModel.Value): JSX.Element {
        if (value instanceof MessageModel.Send) {
            return (
                <>
                    <div>
                        From:{' '}
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.fromAddress}`}>{value.fromAddress}</Link>
                    </div>
                    <div>
                        To: <Link to={`${NavigationConstants.ACCOUNT}/${value.toAddress}`}>{value.toAddress}</Link>
                    </div>
                    <div>
                        Amount: {value.amount[0].amount} {value.amount[0].denom.toUpperCase()}
                    </div>
                </>
            );
        }

        if (value instanceof MessageModel.CreateValidator) {
            return (
                <>
                    <div>Delegator: {value.delegatorAddress}</div>
                    <div>Validator: {value.validatorAddress}</div>
                </>
            );
        }

        if (value instanceof MessageModel.Delegate) {
            return <div>Delegate</div>;
        }

        if (value instanceof MessageModel.Undelegate) {
            return <div>Undelegate</div>;
        }

        if (value instanceof MessageModel.EditValidator) {
            return <div>EditValidator</div>;
        }

        return <div>{i18n.t('errorOccurred')}</div>;
    }

    renderMessages(): JSX.Element | null {
        const { messages } = this.props.transaction;

        if (!messages || !messages.length) {
            return null;
        }

        return (
            <Card>
                <h2>Messages</h2>
                {messages.map((message, index) => {
                    return (
                        <Card key={index}>
                            <h3>{MessagesUtils.name(message.type)}</h3>
                            {this.renderMessage(message.value)}
                        </Card>
                    );
                })}
            </Card>
        );
    }

    renderInformation(): JSX.Element {
        const { transaction } = this.props;

        return (
            <Card className="mb-4">
                <div className="row align-items-center">
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={hashLogo} /> Tx hash
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p title={transaction.hash}>{StringsUtils.trunc(transaction.hash || '', 10)}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={blockLogo} /> Block height
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>
                            <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                        </p>
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={clockLogo} /> Tx Time
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>{`${moment.utc(transaction.dispatchedAt).fromNow()} (${moment
                            .utc(transaction.dispatchedAt)
                            .tz(SystemConstants.TIMEZONE)
                            .format('lll')})`}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={searchLogo} /> Status
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <Badge success={transaction.success} />
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={gasLogo} /> Gas&nbsp;<small>(used/wanted)</small>
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>
                            {transaction.gasUsed} / {transaction.gasWanted}
                        </p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="transaction" src={feeLogo} /> Fee
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>Soon</p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={memoLogo} /> Memo
                        </h4>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-8">
                        <p>{transaction.name || '-'}</p>
                    </div>
                </div>
            </Card>
        );
    }

    renderContent(): JSX.Element {
        return (
            <>
                <h2 className="mb-3">
                    <img alt="block" src={transactionLogo} /> Details for Transactions
                </h2>
                {this.renderInformation()}
                {this.renderMessages()}
            </>
        );
    }

    renderLoading(): JSX.Element {
        return (
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    render(): JSX.Element {
        const { transaction, loading } = this.props;

        if (!transaction || loading) {
            return this.renderLoading();
        }

        return this.renderContent();
    }
}

export default connect(mapState, mapDispatch)(TransactionPage);
