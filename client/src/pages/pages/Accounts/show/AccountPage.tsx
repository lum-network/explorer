import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import accountLogo from 'assets/images/accountDark.svg';
import { Card, CodeQr, Loading } from 'components';
import '../Accounts.scss';
import checkLogo from 'assets/images/check.svg';
import copyLogo from 'assets/images/copy.svg';

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

    renderInformation(): JSX.Element {
        const { account, loading } = this.props;
        const { copied } = this.state;

        return (
            <>
                <Card dark>
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
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(AccountPage);
