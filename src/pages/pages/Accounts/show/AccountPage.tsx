import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import accountLogo from 'assets/images/accountDark.svg';
import { DelegationsList, TransactionsList, Tooltip, UnbondingsList } from 'components';
import { Card, CodeQr, Loading } from 'frontend-elements';
import '../Accounts.scss';
import copyLogo from 'assets/images/copy.svg';
import { PieChart } from 'react-minimal-pie-chart';
import numeral from 'numeral';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { AccountUtils, i18n, NumbersUtils } from 'utils';
import { NumberConstants } from 'constant';

interface IProps extends RouteComponentProps<{ id: string }> {}

const AccountPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const account = useSelector((state: RootState) => state.accounts.account);
    const loading = useSelector((state: RootState) => state.loading.models.accounts);

    const { id } = props.match.params;

    const [copied, setCopied] = useState(false);
    const [available, setAvailable] = useState(0.0);
    const [delegated, setDelegated] = useState(0.0);
    const [reward, setReward] = useState(0.0);
    const [unbonding, setUnbonding] = useState(0.0);
    const [total, setTotal] = useState(0.0);

    useEffect(() => {
        dispatch.accounts.getAccount(id);
    }, []);

    useEffect(() => {
        if (!account) {
            return;
        }

        const { balance, allRewards, delegations, unbondings } = account;

        const available = parseFloat(balance ? balance.amount : '0');
        const reward =
            parseFloat(allRewards.total && allRewards.total.length ? allRewards.total[0].amount : '0') /
            NumberConstants.CLIENT_PRECISION;
        const delegated = AccountUtils.sumOfDelegations(delegations);
        const unbonding = AccountUtils.sumOfUnbonding(unbondings);

        const total = available + reward + delegated + unbonding;

        setAvailable(available);
        setReward(reward);
        setDelegated(delegated);
        setUnbonding(unbonding);
        setTotal(total);
    }, [account]);

    const copyAddress = (): void => {
        const { address } = account;

        if (!address) {
            return;
        }

        navigator.clipboard.writeText(address).finally(() => null);

        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const renderTransactions = (): JSX.Element | null => {
        if (!account || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { transactions } = account;

        if (!transactions || !transactions.length) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2" alt="placeholder" src={placeholderTx} />
                    {i18n.t('noTransaction')}
                </Card>
            );
        }

        return <TransactionsList title transactions={transactions} />;
    };

    const renderDelegationsAndUnbondings = (): JSX.Element => {
        if (!account || loading) {
            return (
                <div className="row">
                    <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                        <Card>
                            <Loading />
                        </Card>
                    </div>
                    <div className="col-12 col-xxl-6 mb-5">
                        <Card>
                            <Loading />
                        </Card>
                    </div>
                </div>
            );
        }

        const { delegations, allRewards, unbondings } = account;

        return (
            <div className="row">
                <div className="col-12 col-xxl-6 mb-4 mb-xxl-5">
                    <DelegationsList title delegations={delegations} rewards={allRewards.rewards} />
                </div>
                <div className="col-12 col-xxl-6 mb-5">
                    <UnbondingsList unbondings={unbondings} title />
                </div>
            </div>
        );
    };

    const renderPie = (): JSX.Element | null => {
        if (!available && !delegated && !unbonding && !reward) {
            return null;
        }

        return (
            <div className="col-12 col-lg-3 col-xxl-2 d-flex justify-content-center mb-4 mb-lg-0">
                <PieChart
                    data={[
                        {
                            title: 'Available',
                            value: NumbersUtils.getPercentage(available, total),
                            color: '#5FD68B',
                        },
                        {
                            title: 'Delegated',
                            value: NumbersUtils.getPercentage(delegated, total),
                            color: '#FD9033',
                        },
                        {
                            title: 'Unbonding',
                            value: NumbersUtils.getPercentage(unbonding, total),
                            color: '#5F99DC',
                        },
                        {
                            title: 'Reward',
                            value: NumbersUtils.getPercentage(reward, total),
                            color: '#5FD2DC',
                        },
                    ]}
                    animate
                    rounded
                    lineWidth={25}
                    className="d-flex app-pie-container"
                />
            </div>
        );
    };

    const renderInformation = (): JSX.Element => {
        return (
            <>
                <Card dark withoutPadding={!loading} className="p-3 p-xl-3 mb-5">
                    {!account || loading ? (
                        <Loading />
                    ) : (
                        <div className="d-flex align-items-center flex-sm-nowrap flex-wrap">
                            <div className="account-qr-container me-3 me-md-5">
                                <CodeQr content={account.address || ''} />
                            </div>
                            <div className="d-flex flex-column flex-grow-1">
                                <div className="row mt-3 mt-sm-0">
                                    <div className="col-xl-6">
                                        <Tooltip show={copied} content="Copied!" className="me-2" direction="right">
                                            <div className="d-flex flex-row align-items-center">
                                                <h4 className="mb-1 text-white">{i18n.t('address')}&nbsp;</h4>
                                                <img
                                                    alt="copy"
                                                    src={copyLogo}
                                                    onClick={copyAddress}
                                                    className="pointer img-cpy placeholder-image"
                                                />
                                            </div>
                                        </Tooltip>
                                        <p className="text-break">{account.address}</p>
                                    </div>
                                    <div className="mt-3 mt-xl-0 col-xl-6 offset-xxl-1 col-xxl-5">
                                        <h4 className="mb-1 text-white">{i18n.t('rewardAddress')}</h4>
                                        <p className="text-break">{account.withdrawAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
                <Card className="mb-5 p-2">
                    {!account || loading ? (
                        <Loading />
                    ) : (
                        <div className="row align-items-center">
                            {renderPie()}
                            <div className="col-5 col-md-4 col-lg-3 col-xxl-2">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot green me-2" />
                                    {i18n.t('available')}
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot orange me-2" />
                                    {i18n.t('delegated')}
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot blue me-2" />
                                    {i18n.t('unbonding')}
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="app-dot cyan me-2" />
                                    {i18n.t('reward')}
                                </div>
                            </div>
                            <div className="col-5 col-md-4 col-lg-3 col-xxl-2">
                                <div className="mb-2">{numeral(available).format('0,0.000000')}</div>
                                <div className="mb-2">{numeral(delegated).format('0,0.000000')}</div>
                                <div className="mb-2">{numeral(unbonding).format('0,0.000000')}</div>
                                <div>{numeral(reward).format('0,0.000000')}</div>
                            </div>
                            <div className="col-2 col-md-4 col-lg-3 col-xxl-2">
                                <div className="mb-2">
                                    <p>{numeral(available / total).format('0.00%')}</p>
                                </div>
                                <div className="mb-2">
                                    <p>{numeral(delegated / total).format('0.00%')}</p>
                                </div>
                                <div className="mb-2">
                                    <p>{numeral(unbonding / total).format('0.00%')}</p>
                                </div>
                                <div>
                                    <p>{numeral(reward / total).format('0.00%')}</p>
                                </div>
                            </div>
                            <div className="col-12 col-xxl-4 mt-4 mt-xxl-0">
                                <Card flat>
                                    <div className="d-flex flex-xxl-column justify-content-around">
                                        <div className="d-flex flex-column align-items-xxl-end">
                                            <div className="d-flex align-items-center">
                                                <p className="text-muted">{i18n.t('total')}</p>
                                                <span className="ms-1 color-type">LUM</span>
                                            </div>
                                            <div>{numeral(total).format('0,0.000000')}</div>
                                        </div>
                                        <div className="d-flex flex-column align-items-xxl-end mt-xxl-4">
                                            <div className="d-flex align-items-center">
                                                <p className="text-muted">{numeral(0.1).format('$0,0.00')}</p>
                                                &nbsp;/&nbsp;
                                                <span className="color-type">LUM</span>
                                            </div>
                                            {/*TODO: get value */}
                                            <div>{numeral(total * 0.1).format('$0,0.00')}</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                </Card>
            </>
        );
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="block" src={accountLogo} /> {i18n.t('accountDetails')}
            </h2>
            {renderInformation()}
            {renderDelegationsAndUnbondings()}
            {renderTransactions()}
        </>
    );
};

export default AccountPage;
