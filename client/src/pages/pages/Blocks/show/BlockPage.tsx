import React, { PureComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Loading, TransactionsList } from 'components';

import moment from 'moment-timezone';
import { SystemConstants, NavigationConstants } from 'constant';
import blockLogo from 'assets/images/blockDark.svg';
import transactionLogo from 'assets/images/transactionDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import hashLogo from 'assets/images/hashDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import { StringsUtils } from 'utils';
import checkLogo from 'assets/images/check.svg';
import copyLogo from 'assets/images/copyDark.svg';
import placeholderTx from 'assets/images/placeholderTx.svg';

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
    copied: boolean;
}

const mapState = (state: RootState) => ({
    block: state.blocks.block,
    loading: state.loading.effects.blocks.getBlock,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getBlock: (id: string) => dispatch.blocks.getBlock(id),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlockPage extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            copied: false,
        };
    }

    componentDidMount(): void {
        const { getBlock } = this.props;
        const { id } = this.props.match.params;

        getBlock(id).finally(() => null);
    }

    copyHash = (): void => {
        const { hash } = this.props.block;

        if (!hash) {
            return;
        }

        navigator.clipboard.writeText(hash).finally(() => null);
        this.setState({ copied: true });
    };

    renderTransactions(): JSX.Element | null {
        const { block, loading } = this.props;

        if (!block || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { transactions } = this.props.block;

        if (!transactions || !transactions.length) {
            return (
                <Card className="d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2" alt="placeholder" src={placeholderTx} />
                    No transaction
                </Card>
            );
        }

        return <TransactionsList title transactions={transactions} />;
    }

    renderInformation(): JSX.Element {
        const { block, loading } = this.props;
        const { copied } = this.state;

        if (!block || loading) {
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
                            <img alt="block" src={blockLogo} /> Height
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>{block.height}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={transactionLogo} /> Number of txs
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p>{block.numTxs}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={clockLogo} /> Block Time
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-4 col-md-9 col-sm-8">
                        <p>{`${moment.utc(block.dispatchedAt).fromNow()} (${moment
                            .utc(block.dispatchedAt)
                            .tz(SystemConstants.TIMEZONE)
                            .format('lll')})`}</p>
                    </div>
                    <div className="mb-sm-4 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={validatorLogo} /> Proposer
                        </h4>
                    </div>
                    <div className="mb-4 col-lg-3 col-md-9 col-sm-8">
                        <p title={block.proposerAddress}>
                            <Link to={`${NavigationConstants.VALIDATORS}/${block.proposerAddress}`}>
                                {StringsUtils.trunc(block.proposerAddress || '', 5)}
                            </Link>
                        </p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={hashLogo} /> Block hash
                        </h4>
                    </div>
                    <div className="col-lg-4 col-md-9 col-sm-8">
                        <div className="d-flex align-items-center">
                            <p title={block.hash}>{StringsUtils.trunc(block.hash || '', 10)}&nbsp;</p>
                            <img
                                alt="copy"
                                src={copied ? checkLogo : copyLogo}
                                onClick={this.copyHash}
                                className="pointer img-cpy"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    render(): JSX.Element {
        const { block } = this.props;
        const { id } = this.props.match.params;

        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={blockLogo} /> Details for Block #{(block && block.height) || id}
                </h2>
                {this.renderInformation()}
                {this.renderTransactions()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(BlockPage);
