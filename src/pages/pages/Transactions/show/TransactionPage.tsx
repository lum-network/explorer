import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { MessageType, Badge, Tooltip, SmallerDecimal, VoteOption } from 'components';
import { Card, Loading } from 'frontend-elements';
import moment from 'moment-timezone';
import { NavigationConstants, NumberConstants, SystemConstants } from 'constant';
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
import '../Transactions.scss';

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
                            {value.amount && value.amount[0] ? (
                                <>
                                    {NumbersUtils.formatNumber(value.amount[0], true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
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
                        {value.minSelfDelegation ? (
                            <>
                                <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(value.minSelfDelegation)).format('0,0.000000')} />
                                <span className="color-type ms-2">{LumConstants.LumDenom}</span>
                            </>
                        ) : (
                            '-'
                        )}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>{value.delegatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
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
                            {NumbersUtils.formatNumber(value.value, true)}
                            <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
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
                            <a rel="noreferrer" target="_blank" href={value.description.website.startsWith('http') ? value.description.website : `https://${value.description.website}`}>
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
                        {value.commission.rates.rate ? numeral(parseFloat(value.commission.rates.rate || '') / NumberConstants.CLIENT_PRECISION).format('0.00%') : '-'}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('comMaxRate')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        {value.commission.rates.maxRate ? numeral(parseFloat(value.commission.rates.maxRate || '') / NumberConstants.CLIENT_PRECISION).format('0.00%') : '-'}
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('comMaxChangeRate')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        {value.commission.rates.maxChangeRate ? numeral(parseFloat(value.commission.rates.maxChangeRate || '') / NumberConstants.CLIENT_PRECISION).format('0.00%') : '-'}
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
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>{value.delegatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            {NumbersUtils.formatNumber(value.amount, true)}
                            <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
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
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>{value.delegatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <div className="d-flex">
                            {NumbersUtils.formatNumber(value.amount, true)}
                            <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                    {transaction.autoClaimReward && (
                        <>
                            <div className="col-12 col-md-3 col-xl-2">
                                <h5>{i18n.t('autoClaimReward')}</h5>
                            </div>
                            <div className="col-12 col-md-9 col-xl-10 text-break">
                                <div className="d-flex">
                                    {NumbersUtils.formatNumber(transaction.autoClaimReward, true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            );
        }

        if (message instanceof MessageModel.EditValidator) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
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
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.description.website}</div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('identity')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">{value.description.identity || '-'}</div>
                </div>
            );
        }

        if (message instanceof MessageModel.MultiSend) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-2">
                        <h5>{i18n.t('senders')}</h5>
                    </div>
                    {value.inputs.map((input, index) => (
                        <div key={index} className={`${index !== 0 && 'offset-md-3 offset-xl-2'} col-12 col-md-9 col-xl-10 mb-2 text-break`}>
                            <Link to={`${NavigationConstants.ACCOUNT}/${input.address}`}>{input.address}</Link>
                            {input.coins.length && (
                                <>
                                    &nbsp;&nbsp; (
                                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(input.coins[0].amount)).format('0,0.000000')} />
                                    <span className="color-type ms-2">{LumConstants.LumDenom}</span>)
                                </>
                            )}
                        </div>
                    ))}
                    <div className="col-12 col-md-3 col-xl-2 mb-md-2 mt-3">
                        <h5>{i18n.t('receivers')}</h5>
                    </div>
                    {value.outputs.map((output, index) => (
                        <div key={index} className={`${index !== 0 ? 'offset-md-3 offset-xl-2' : 'mt-md-3'} col-12 col-md-9 col-xl-10 mb-2 text-break`}>
                            <Link to={`${NavigationConstants.ACCOUNT}/${output.address}`}>{output.address}</Link>
                            {output.coins.length && (
                                <>
                                    &nbsp;&nbsp; (
                                    <SmallerDecimal nb={numeral(NumbersUtils.convertUnitNumber(output.coins[0].amount)).format('0,0.000000')} />
                                    <span className="color-type ms-2">{LumConstants.LumDenom}</span>)
                                </>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (message instanceof MessageModel.GetReward) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>{value.delegatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2  mb-md-3">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            {NumbersUtils.formatNumber(transaction.amount, true)}
                            <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.WithdrawValidatorCommission) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.SubmitProposal) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('proposerAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.proposerAddress}`}>{value.proposerAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('initialDeposit')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            {value.initialDeposit && value.initialDeposit[0] ? (
                                <>
                                    {NumbersUtils.formatNumber(value.initialDeposit[0], true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.Deposit) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('proposalId')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.PROPOSALS}/${value.proposalId.toString()}`}>{value.proposalId.toString()}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('depositorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.depositorAddress}`}>{value.depositorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            {value.amount && value.amount[0] ? (
                                <>
                                    {NumbersUtils.formatNumber(value.amount[0], true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.Vote) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('proposalId')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.PROPOSALS}/${value.proposalId.toString()}`}>{value.proposalId.toString()}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('voterAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.voterAddress}`}>{value.voterAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('option')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">{value.option && <VoteOption option={value.option} />}</div>
                </div>
            );
        }

        if (message instanceof MessageModel.OpenBeam) {
            const { value } = message;

            if (value) {
                return (
                    <div className="row align-items-center">
                        <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                            <h5>{i18n.t('id')}</h5>
                        </div>
                        <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                            <Link to={`${NavigationConstants.BEAMS}/${value.id}`}>{value.id}</Link>
                        </div>
                        <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                            <h5>{i18n.t('amount')}</h5>
                        </div>
                        <div className="col-12 col-md-9 col-xl-10 text-break mb-3">
                            <div className="d-flex">
                                {value.amount ? (
                                    <>
                                        {NumbersUtils.formatNumber(value.amount, true)}
                                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                    </>
                                ) : (
                                    '-'
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-xl-2">
                            <h5>{i18n.t('secret')}</h5>
                        </div>
                        <div className="col-12 col-md-9 col-xl-10 text-break">{value.secret}</div>
                    </div>
                );
            }
        }

        if (message instanceof MessageModel.UpdateBeam) {
            const { value } = message;

            if (value) {
                return <div className="row align-items-center">{listItem(value as Record<string, unknown>)}</div>;
            }
        }

        if (message instanceof MessageModel.ClaimBeam) {
            const { value } = message;

            if (value) {
                return <div className="row align-items-center">{listItem(value as Record<string, unknown>)}</div>;
            }
        }

        if (message instanceof MessageModel.CreateVestingAccount) {
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
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <div className="d-flex">
                            {value.amount && value.amount[0] ? (
                                <>
                                    {NumbersUtils.formatNumber(value.amount[0], true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delayed')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{value.delayed}</div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('endTime')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <p>{`${moment.utc(value.endTime.toNumber() * 1000).fromNow()} (${moment
                            .utc(value.endTime.toNumber() * 1000)
                            .tz(SystemConstants.TIMEZONE)
                            .format('lll')})`}</p>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.BeginRedelegate) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('delegatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.ACCOUNT}/${value.delegatorAddress}`}>{value.delegatorAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('srcValidator')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorSrcAddress}`}>{value.validatorSrcAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                        <h5>{i18n.t('dstValidator')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorDstAddress}`}>{value.validatorDstAddress}</Link>
                    </div>
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('amount')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <div className="d-flex">
                            {value.amount ? (
                                <>
                                    {NumbersUtils.formatNumber(value.amount, true)}
                                    <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                </>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (message instanceof MessageModel.Unjail) {
            const { value } = message;

            return (
                <div className="row align-items-center">
                    <div className="col-12 col-md-3 col-xl-2">
                        <h5>{i18n.t('validatorAddress')}</h5>
                    </div>
                    <div className="col-12 col-md-9 col-xl-10 text-break">
                        <Link to={`${NavigationConstants.VALIDATORS}/${value.validatorAddress}`}>{value.validatorAddress}</Link>
                    </div>
                </div>
            );
        }

        if (message) {
            const { value } = message;

            if (value) {
                return <div className="row align-items-center">{listItem(value as Record<string, unknown>)}</div>;
            }
        }

        return <div>{i18n.t('errorOccurred')}</div>;
    };

    const listItem = (value: Record<string, unknown>) => {
        let list: JSX.Element | null = null;

        for (const property in value) {
            if (value.hasOwnProperty(property)) {
                list = (
                    <>
                        {list}
                        <div className="col-12 col-md-3 col-xl-2 mb-md-3">
                            <h5>{property}</h5>
                        </div>
                        <div className="col-12 col-md-9 col-xl-10 mb-3 text-break">{JSON.stringify(value[property])}</div>
                    </>
                );
            }
        }

        return list;
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

    const renderErrorLogs = () => {
        if (transaction.success) {
            return null;
        }

        return (
            <div className="col-12 mb-4">
                <div className="error-container">{transaction.rawLogs && transaction.rawLogs[0] && transaction.rawLogs[0].log ? transaction.rawLogs[0].log : i18n.t('errorOccurred')}</div>
            </div>
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
                    {renderErrorLogs()}
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={hashLogo} /> {i18n.t('txHash')}
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <Tooltip show={copied} content="Copied!" className="me-2" direction="right">
                            <div className="d-flex align-items-center">
                                <p title={transaction.hash}>{StringsUtils.trunc(transaction.hash || '', 10)}&nbsp;</p>
                                <img alt="copy" src={copyLogo} onClick={copyHash} className="pointer img-cpy placeholder-image" />
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
                        <p>{`${moment.utc(transaction.time).fromNow()} (${moment.utc(transaction.time).tz(SystemConstants.TIMEZONE).format('lll')})`}</p>
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
                                    <span>
                                        {NumbersUtils.formatNumber(transaction.fees[0], true)}
                                        <span className="ms-2 color-type">{LumConstants.LumDenom}</span>
                                    </span>
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
                <img alt="transaction" src={transactionLogo} /> {i18n.t('transactionDetails')}
            </h2>
            {renderInformation()}
            {renderMessages()}
        </>
    );
};

export default TransactionPage;
