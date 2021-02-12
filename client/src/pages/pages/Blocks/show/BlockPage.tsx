import React, { PureComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, TransactionsList } from 'components';

import moment from 'moment-timezone';
import { SystemConstants, NavigationConstants } from 'constant';
import blockLogo from 'assets/images/blockDark.svg';
import transactionLogo from 'assets/images/transactionDark.svg';
import clockLogo from 'assets/images/clockDark.svg';
import hashLogo from 'assets/images/hashDark.svg';
import validatorLogo from 'assets/images/validatorDark.svg';
import { StringsUtils } from 'utils';

interface IProps extends RouteComponentProps<{ id: string }> {}

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

class BlockPage extends PureComponent<Props> {
    componentDidMount(): void {
        const { getBlock } = this.props;
        const { id } = this.props.match.params;

        getBlock(id).finally(() => null);
    }

    renderTransactions(): JSX.Element | null {
        const { transactions } = this.props.block;

        if (!transactions || !transactions.length) {
            return null;
        }

        return <TransactionsList transactions={transactions} />;
    }

    renderInformation(): JSX.Element {
        const { block } = this.props;

        return (
            <Card className="mb-4">
                <div className="row">
                    <div className="mb-sm-3 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={blockLogo} /> Height
                        </h4>
                    </div>
                    <div className="mb-3 col-lg-4 col-md-9 col-sm-8">
                        <p>{block.height}</p>
                    </div>
                    <div className="mb-sm-3 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={transactionLogo} /> Number of txs
                        </h4>
                    </div>
                    <div className="mb-3 col-lg-3 col-md-9 col-sm-8">
                        <p>{block.numTxs}</p>
                    </div>
                    <div className="mb-sm-3 col-lg-2 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={clockLogo} /> Block Time
                        </h4>
                    </div>
                    <div className="mb-3 col-lg-4 col-md-9 col-sm-8">
                        <p>{`${moment.utc(block.dispatchedAt).fromNow()} (${moment
                            .utc(block.dispatchedAt)
                            .tz(SystemConstants.TIMEZONE)
                            .format('lll')})`}</p>
                    </div>
                    <div className="mb-sm-3 col-lg-3 col-xl-2 offset-xl-1 col-md-3 col-sm-4">
                        <h4>
                            <img alt="block" src={validatorLogo} /> Proposer
                        </h4>
                    </div>
                    <div className="mb-3 col-lg-3 col-md-9 col-sm-8">
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
                        <p title={block.hash}>{StringsUtils.trunc(block.hash || '', 10)}</p>
                    </div>
                </div>
            </Card>
        );
    }

    renderContent(): JSX.Element {
        const { block } = this.props;

        return (
            <>
                <h2 className="mb-3">
                    <img alt="block" src={blockLogo} /> Details for Block #{block.height}
                </h2>
                {this.renderInformation()}
                {this.renderTransactions()}
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
        const { block, loading } = this.props;

        if (!block || loading) {
            return this.renderLoading();
        }

        return this.renderContent();
    }
}

export default connect(mapState, mapDispatch)(BlockPage);
