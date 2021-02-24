import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import accountLogo from 'assets/images/accountDark.svg';
import { Card, CodeQr, Loading, TransactionsList } from 'components';
import '../Accounts.scss';
import checkLogo from 'assets/images/check.svg';
import copyLogo from 'assets/images/copy.svg';
import { PieChart } from 'react-minimal-pie-chart';
import numeral from 'numeral';
import ticker from 'assets/images/ticker.svg';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { AccountUtils, i18n, NumbersUtils } from 'utils';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    copied: boolean;
    available: number;
    delegated: number;
    unbonding: number;
    reward: number;
    total: number;
}

const mapState = (state: RootState) => ({
    account: state.accounts.account,
    loading: state.loading.models.accounts,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getAccount: (id: string) => dispatch.accounts.getAccount(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class AccountPage extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            copied: false,
            available: 0,
            delegated: 0,
            reward: 0,
            unbonding: 0,
            total: 0,
        };
    }

    componentDidMount(): void {
        const { getAccount } = this.props;
        const { id } = this.props.match.params;

        getAccount(id).then(() => {
            const { coins, allRewards, delegations } = this.props.account;

            console.log(this.props.account);

            const available = parseFloat(coins.length ? coins[0].amount : '0');
            const reward = parseFloat(allRewards.total && allRewards.total.length ? allRewards.total[0].amount : '0');
            const delegated = AccountUtils.sumOfDelegations(delegations);

            const total = available + reward + delegated;

            this.setState({ available, total, reward, delegated });
        });
    }

    copyAddress = (): void => {
        const { address } = this.props.account;

        if (!address) {
            return;
        }

        navigator.clipboard.writeText(address).finally(() => null);
        this.setState({ copied: true });
    };

    renderTransactions(): JSX.Element | null {
        const { account, loading } = this.props;

        if (!account || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { transactions } = this.props.account;

        if (!transactions || !transactions.length) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2" alt="placeholder" src={placeholderTx} />
                    {i18n.t('noTransaction')}
                </Card>
            );
        }

        return <TransactionsList title transactions={transactions} />;
    }

    renderPie(): JSX.Element | null {
        const { available, delegated, unbonding, reward, total } = this.state;

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
    }

    renderInformation(): JSX.Element {
        const { account, loading } = this.props;
        const { copied, available, delegated, unbonding, reward, total } = this.state;

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
                                        <div className="d-flex flex-row align-items-center">
                                            <h4 className="mb-1 text-white">{i18n.t('address')}&nbsp;</h4>
                                            <img
                                                alt="copy"
                                                src={copied ? checkLogo : copyLogo}
                                                onClick={this.copyAddress}
                                                className="pointer img-cpy"
                                            />
                                        </div>
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
                            {this.renderPie()}
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
                                                <p className="text-muted">{i18n.t('total')}</p>&nbsp;
                                                <img alt="ticker" src={ticker} />
                                            </div>
                                            <div>{numeral(total).format('0,0.000000')}</div>
                                        </div>
                                        <div className="d-flex flex-column align-items-xxl-end mt-xxl-4">
                                            <div className="d-flex align-items-center">
                                                <p className="text-muted">{numeral(0.1).format('$0,0.00')}</p>
                                                &nbsp;/&nbsp;
                                                <img alt="ticker" src={ticker} />
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
    }

    render(): JSX.Element {
        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={accountLogo} /> {i18n.t('accountDetails')}
                </h2>
                {this.renderInformation()}
                {this.renderTransactions()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(AccountPage);
