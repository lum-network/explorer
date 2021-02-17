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

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    copied: boolean;
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
        };
    }

    componentDidMount(): void {
        const { getAccount } = this.props;
        const { id } = this.props.match.params;

        getAccount(id).finally(() => null);
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
                <Card>
                    <Loading />
                </Card>
            );
        }

        const { transactions } = this.props.account;

        if (!transactions || !transactions.length) {
            return (
                <Card className="d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2" alt="placeholder" src={placeholderTx} />
                    No transaction
                </Card>
            );
        }

        return <TransactionsList transactions={transactions} />;
    }

    renderInformation(): JSX.Element {
        const { account, loading } = this.props;
        const { copied } = this.state;

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
                                            <h4 className="mb-1 text-white">Address&nbsp;</h4>
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
                                        <h4 className="mb-1 text-white">Reward address</h4>
                                        <p className="text-break">{account.withdrawAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
                <Card className="mb-5">
                    {!account || loading ? (
                        <Loading />
                    ) : (
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-3 col-xxl-2 d-flex justify-content-center mb-4 mb-lg-0">
                                {/*TODO Get real data */}
                                <PieChart
                                    data={[
                                        { title: 'Available', value: 10, color: '#5FD68B' },
                                        { title: 'Delegated', value: 15, color: '#FD9033' },
                                        { title: 'Unbonding', value: 20, color: '#5F99DC' },
                                        { title: 'Reward', value: 34, color: '#5FD2DC' },
                                    ]}
                                    animate
                                    rounded
                                    lineWidth={20}
                                    paddingAngle={18}
                                    className="d-flex app-pie-container"
                                />
                            </div>
                            <div className="col-5 col-md-4 col-lg-3 col-xxl-2">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot green me-2" />
                                    Available
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot orange me-2" />
                                    Delegated
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="app-dot blue me-2" />
                                    Unbonding
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="app-dot cyan me-2" />
                                    Reward
                                </div>
                            </div>
                            <div className="col-5 col-md-4 col-lg-3 col-xxl-2">
                                {/*TODO: get value */}
                                <div className="mb-2">{numeral(1234.34).format('0,0.000000')}</div>
                                <div className="mb-2">{numeral(34.34546).format('0,0.000000')}</div>
                                <div className="mb-2">{numeral(0).format('0,0.000000')}</div>
                                <div>{numeral(9834.34454).format('0,0.000000')}</div>
                            </div>
                            <div className="col-2 col-md-4 col-lg-3 col-xxl-2">
                                {/*TODO: get percentage */}
                                <div className="mb-2">
                                    <p>{numeral(10 / 100).format('0.00%')}</p>
                                </div>
                                <div className="mb-2">
                                    <p>{numeral(15 / 100).format('0.00%')}</p>
                                </div>
                                <div className="mb-2">
                                    <p>{numeral(20 / 100).format('0.00%')}</p>
                                </div>
                                <div>
                                    <p>{numeral(34 / 100).format('0.00%')}</p>
                                </div>
                            </div>
                            <div className="col-12 col-xxl-4 mt-4 mt-xxl-0">
                                <Card flat>
                                    <div className="d-flex flex-xxl-column justify-content-around">
                                        <div className="d-flex flex-column align-items-xxl-end">
                                            <div className="d-flex align-items-center">
                                                <p className="text-muted">Total</p>&nbsp;
                                                <img alt="ticker" src={ticker} />
                                            </div>
                                            {/*TODO: get value */}
                                            <div>{numeral(27.3456).format('0,0.000000')}</div>
                                        </div>
                                        <div className="d-flex flex-column align-items-xxl-end mt-xxl-4">
                                            <div className="d-flex align-items-center">
                                                <p className="text-muted">{numeral(28.5).format('$0,0.00')}</p>
                                                &nbsp;/&nbsp;
                                                <img alt="ticker" src={ticker} />
                                            </div>
                                            {/*TODO: get value */}
                                            <div>{numeral(576.57).format('$0,0.00')}</div>
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
                    <img alt="block" src={accountLogo} /> Account details
                </h2>
                {this.renderInformation()}
                {this.renderTransactions()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(AccountPage);
