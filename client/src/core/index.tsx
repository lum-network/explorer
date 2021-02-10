import React, { PureComponent } from 'react';
import RootNavigator from 'navigation';
import { connect } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { TimesUtils } from 'utils';
import { BlocksModel, TransactionsModel } from 'models';
import Pusher from 'pusher-js';
import { SocketConstants } from 'constant';
import { plainToClass } from 'class-transformer';

interface IProps {}

const mapState = (state: RootState) => ({
    loading: state.loading.global,
    blocks: state.blocks.blocks,
    transactions: state.transactions.transactions,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchBlocks: () => dispatch.blocks.fetchBlocks(),
    fetchTransactions: () => dispatch.transactions.fetchTransactions(),
    addBlock: (block: BlocksModel) => dispatch.blocks.addBlock(block),
    addTransaction: (transaction: TransactionsModel) => dispatch.transactions.addTransaction(transaction),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class Core extends PureComponent<Props> {
    interval: NodeJS.Timeout | null = null;
    pusher: Pusher | null = null;

    componentDidMount(): void {
        this.fetch();
        this.interval = setInterval(() => {
            this.fetch();
        }, TimesUtils.INTERVAL_IN_MS);

        this.sockets();
    }

    componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }

        if (this.pusher) {
            this.pusher.unsubscribe(SocketConstants.TRANSACTIONS);
            this.pusher.unsubscribe(SocketConstants.BLOCKS);
        }
    }

    fetch = () => {
        const { fetchBlocks, fetchTransactions } = this.props;

        fetchBlocks().finally(() => null);
        fetchTransactions().finally(() => null);
    };

    sockets = () => {
        const { addTransaction, addBlock } = this.props;

        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '', {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        });

        const transactionsChannel = this.pusher.subscribe(SocketConstants.TRANSACTIONS);
        const blocksChannel = this.pusher.subscribe(SocketConstants.BLOCKS);

        transactionsChannel.bind(SocketConstants.NEW_TRANSACTION_EVENT, (data: Record<string, unknown>) => {
            const transaction = plainToClass(TransactionsModel, data);

            addTransaction(transaction);
        });

        blocksChannel.bind(SocketConstants.NEW_BLOCK_EVENT, (data: Record<string, unknown>) => {
            const block = plainToClass(BlocksModel, data);

            addBlock(block);
        });
    };

    renderContent(): JSX.Element {
        return <RootNavigator />;
    }

    renderLoading(): JSX.Element {
        return (
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    render(): JSX.Element {
        const { loading, blocks, transactions } = this.props;

        return (!blocks || !blocks.length || !transactions || !transactions.length) && loading
            ? this.renderLoading()
            : this.renderContent();
    }
}

export default connect(mapState, mapDispatch)(Core);
