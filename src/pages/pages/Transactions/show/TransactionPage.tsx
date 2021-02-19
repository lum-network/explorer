import React, { PureComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Badge, Card, Loading, MessageType } from 'components';
import moment from 'moment-timezone';
import { NavigationConstants, SystemConstants } from 'constant';
import { i18n, StringsUtils } from 'utils';
import { MessageModel } from 'models';
import blockLogo from 'assets/images/blockDark.svg';
import transactionLogo from 'assets/images/transactionDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import gasLogo from 'assets/images/gasDark.svg';
import hashLogo from 'assets/images/hashDark.svg';
import searchLogo from 'assets/images/searchDark.svg';
import feeLogo from 'assets/images/feeDark.svg';
import memoLogo from 'assets/images/memoDark.svg';
import copyLogo from 'assets/images/copyDark.svg';
import checkLogo from 'assets/images/check.svg';
import numeral from 'numeral';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    copied: boolean;
}

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

class TransactionPage extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            copied: false,
        };
    }

    componentDidMount(): void {
        const { getTransaction } = this.props;
        const { id } = this.props.match.params;

        getTransaction(id).finally(() => null);
    }

    copyHash = (): void => {
        const { hash } = this.props.transaction;

        if (!hash) {
            return;
        }

        navigator.clipboard.writeText(hash).finally(() => null);
        this.setState({ copied: true });
    };

    renderMessage(value: MessageModel.Value): JSX.Element {
        if (value instanceof MessageModel.Send) {
            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('fromAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.fromAddress}`}>{value.fromAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('toAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.toAddress}`}>{value.toAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10">
                        {value.amount[0].amount} {value.amount[0].denom.toUpperCase()}
                    </div>
                </div>
            );
        }

        if (value instanceof MessageModel.CreateValidator) {
            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('minSelfDelegation')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {numeral(value.minSelfDelegation).format('0.000000')}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>
                            {value.delegatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>
                            {value.validatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('pubkey')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.pubkey}</div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('value')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {value.value?.amount} {value.value?.denom.toLocaleUpperCase()}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('details')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.description.details || '-'}</div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('moniker')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.description.moniker || '-'}</div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('website')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {value.description.website ? (
                            <a rel="noreferrer" target="_blank" href={value.description.website}>
                                {value.description.website}
                            </a>
                        ) : (
                            '-'
                        )}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('identity')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.description.identity || '-'}</div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('comRate')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {numeral(value.commission.rate).format('0.00%') || '-'}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('comMaxRate')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {numeral(value.commission.maxRate).format('0.00%') || '-'}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('comMaxChangeRate')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        {numeral(value.commission.maxChangeRate).format('0.00%') || '-'}
                    </div>
                </div>
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
        const { transaction, loading } = this.props;

        if (!transaction || loading) {
            return (
                <Card>
                    <Loading />
                </Card>
            );
        }

        const { messages } = this.props.transaction;

        if (!messages || !messages.length) {
            return null;
        }

        return (
            <Card>
                <h3 className="mb-4">{i18n.t('messages')}</h3>
                {messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <MessageType type={message.type} />
                            <Card flat className="mt-2 mb-5">
                                {this.renderMessage(message.value)}
                            </Card>
                        </div>
                    );
                })}
            </Card>
        );
    }

    renderInformation(): JSX.Element {
        const { transaction, loading } = this.props;
        const { copied } = this.state;

        if (!transaction || loading) {
            return (
                <Card>
                    <Loading />
                </Card>
            );
        }

        return (
            <Card className="mb-5">
                <div className="row align-items-center">
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={hashLogo} /> {i18n.t('txHash')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <div className="d-flex align-items-center">
                            <p title={transaction.hash}>{StringsUtils.trunc(transaction.hash || '', 10)}&nbsp;</p>
                            <img
                                alt="copy"
                                src={copied ? checkLogo : copyLogo}
                                onClick={this.copyHash}
                                className="pointer img-cpy"
                            />
                        </div>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={blockLogo} /> {i18n.t('blockHeight')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>
                            <Link to={`${NavigationConstants.BLOCKS}/${transaction.height}`}>{transaction.height}</Link>
                        </p>
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={clockLogo} /> {i18n.t('txTime')}
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
                            <img alt="block" src={searchLogo} /> {i18n.t('status')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <Badge success={transaction.success} />
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={gasLogo} /> {i18n.t('gas')}&nbsp;
                            <small>
                                ({i18n.t('gasUsed')}/{i18n.t('gasWanted')})
                            </small>
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>
                            {transaction.gasUsed} / {transaction.gasWanted}
                        </p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            {/*TODO: Add fee */}
                            <img alt="transaction" src={feeLogo} /> {i18n.t('fee')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>Soon</p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={memoLogo} /> {i18n.t('memo')}
                        </h4>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-8">
                        <p>{transaction.name || '-'}</p>
                    </div>
                </div>
            </Card>
        );
    }

    render(): JSX.Element {
        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={transactionLogo} /> {i18n.t('transactionDetails')}
                </h2>
                {this.renderInformation()}
                {this.renderMessages()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(TransactionPage);
