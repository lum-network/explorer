import React, { PureComponent } from 'react';
import RootNavigator from 'navigation';
import { connect } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { TimesUtils } from 'utils';
import { BlocksModel, TransactionsModel } from 'models';
import { ApiConstants, SocketConstants } from 'constant';
import { plainToClass } from 'class-transformer';
import io, { Socket } from 'socket.io-client';

interface IProps {}

const mapState = (state: RootState) => ({});

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
    socket: typeof Socket | null = null;

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

        if (this.socket) {
            this.socket.close();
        }
    }

    fetch = () => {
        const { fetchBlocks, fetchTransactions } = this.props;

        fetchBlocks().finally(() => null);
        fetchTransactions().finally(() => null);
    };

    sockets = () => {
        const { addTransaction, addBlock } = this.props;

        this.socket = io(ApiConstants.BASE_URL);

        // const transactionsChannel = this.socket.io.emit(SocketConstants.LISTEN_CHANNEL, {
        //     name: SocketConstants.TRANSACTIONS,
        // });
        // const blocksChannel = this.socket.io.emit(SocketConstants.LISTEN_CHANNEL, {
        //     name: SocketConstants.BLOCKS,
        // });
        this.socket.emit(SocketConstants.LISTEN_CHANNEL, { name: SocketConstants.BLOCKS }, (socket: any) => {
            console.log('test');
        });

        console.log(this.socket);

        // transactionsChannel.on(SocketConstants.NEW_TRANSACTION_EVENT, (data: Record<string, unknown>) => {
        //     const transaction = plainToClass(TransactionsModel, data);
        //
        //     addTransaction(transaction);
        // });

        this.socket.on(SocketConstants.NEW_BLOCK_EVENT, (data: Record<string, unknown>) => {
            //const block = plainToClass(BlocksModel, data);

            console.log('tatoune');
            //console.log(block.height);

            //addBlock(block);
        });
    };

    render(): JSX.Element {
        return <RootNavigator />;
    }
}

export default connect(mapState, mapDispatch)(Core);
