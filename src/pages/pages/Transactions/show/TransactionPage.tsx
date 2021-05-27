import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { MessageType, Badge, Tooltip } from 'components';
import { Card, Loading } from 'frontend-elements';
import moment from 'moment-timezone';
import { NavigationConstants, SystemConstants } from 'constant';
import { i18n, StringsUtils, NumbersUtils } from 'utils';
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
import numeral from 'numeral';
import { LumConstants } from '@lum-network/sdk-javascript';

interface IProps extends RouteComponentProps<{ id: string }> {}

const TransactionPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const transaction = useSelector((state: RootState) => state.transactions.transaction);
    const loading = useSelector((state: RootState) => state.loading.effects.transactions.getTransaction);

    const { id } = props.match.params;

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        dispatch.transactions.getTransaction(id).finally(() => null);
    }, []);

    const copyHash = (): void => {
        const { hash } = transaction;

        if (!hash) {
            return;
        }

        navigator.clipboard.writeText(hash).finally(() => null);

        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const renderMessage = (message: MessageModel.Value): JSX.Element => {
        if (message instanceof MessageModel.Send) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('fromAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.fromAddress}`}>{value.fromAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('toAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.toAddress}`}>{value.toAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: NumbersUtils.formatNumber(value.amount[0]) }} />
                            <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.CreateValidator) {
            const { value } = message;

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
                        <div className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: NumbersUtils.formatNumber(value.value) }} />
                            <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                        </div>
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

        if (message instanceof MessageModel.Delegate) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>
                            {value.delegatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>
                            {value.validatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: NumbersUtils.formatNumber(value.amount) }} />
                            <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.Undelegate) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>
                            {value.delegatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>
                            {value.validatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: NumbersUtils.formatNumber(value.amount) }} />
                            <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.EditValidator) {
            return <div>EditValidator</div>;
        }

        if (message instanceof MessageModel.MultiSend) {
            return <div>MultiSend</div>;
        }

        if (message instanceof MessageModel.GetReward) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>
                            {value.delegatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>
                            {value.validatorAddress}
                        </Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: NumbersUtils.formatNumber(transaction.amount) }} />
                            <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>{i18n.t('errorOccurred')}</div>;
    };

    const renderMessages = (): JSX.Element | null => {
        if (!transaction || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { messages } = transaction;

        if (!messages || !messages.length) {
            return null;
        }

        const length = messages.length;

        return (
            <Card className="mb-5">
                <h3 className="mb-4">{i18n.t('messages')}</h3>
                {messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <MessageType type={message.typeUrl} />
                            <Card flat className={`mt-3 ${length !== index + 1 ? 'mb-5' : ''}`}>
                                {renderMessage(message)}
                            </Card>
                        </div>
                    );
                })}
            </Card>
        );
    };

    const renderInformation = (): JSX.Element => {
        if (!transaction || loading) {
            return (
                <Card className="mb-5">
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
                        <Tooltip show={copied} content="Copied!" className="me-2" direction="right">
                            <div className="d-flex align-items-center">
                                <p title={transaction.hash}>{StringsUtils.trunc(transaction.hash || '', 10)}&nbsp;</p>
                                <img
                                    alt="copy"
                                    src={copyLogo}
                                    onClick={copyHash}
                                    className="pointer img-cpy placeholder-image"
                                />
                            </div>
                        </Tooltip>
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
                        <p>{`${moment.utc(transaction.time).fromNow()} (${moment
                            .utc(transaction.time)
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
                            <img alt="transaction" src={feeLogo} /> {i18n.t('fee')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>
                            {transaction.fees && transaction.fees.length ? (
                                <>
                                    <div className="d-flex">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: NumbersUtils.formatNumber(transaction.fees[0], true),
                                            }}
                                        />
                                        <span className="ms-1 color-type">{LumConstants.LumDenom}</span>
                                    </div>
                                </>
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={memoLogo} /> {i18n.t('memo')}
                        </h4>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-8">
                        <p>{transaction.memo || '-'}</p>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="block" src={transactionLogo} /> {i18n.t('transactionDetails')}
            </h2>
            {renderInformation()}
            {renderMessages()}
        </>
    );
};

export default TransactionPage;
