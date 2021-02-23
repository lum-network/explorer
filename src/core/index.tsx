import React, { PureComponent } from 'react';
import RootNavigator from 'navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux/store';
import { BlocksModel, TransactionsModel } from 'models';
import { ApiConstants, SocketConstants } from 'constant';
import { plainToClass } from 'class-transformer';
import io, { Socket } from 'socket.io-client';

interface IProps {}

const mapState = () => ({});

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
    socket: typeof Socket | null = null;

    componentDidMount(): void {
        this.fetch();
        this.sockets();
    }

    componentWillUnmount(): void {
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
        this.socket.on('connect', () => {
            if (!this.socket) {
                console.warn('cannot listen channel, null socket pointer');
                return;
            }

            this.socket.emit(
                SocketConstants.LISTEN_CHANNEL,
                JSON.stringify({
                    name: SocketConstants.BLOCKS,
                }),
            );

            this.socket.io.emit(
                SocketConstants.LISTEN_CHANNEL,
                JSON.stringify({
                    name: SocketConstants.TRANSACTIONS,
                }),
            );
        });

        this.socket.on(SocketConstants.NEW_TRANSACTION_EVENT, (data: Record<string, unknown>) => {
            const transaction = plainToClass(TransactionsModel, data);
            addTransaction(transaction);
        });

        this.socket.on(SocketConstants.NEW_BLOCK_EVENT, (data: Record<string, unknown>) => {
            const block = plainToClass(BlocksModel, data);
            addBlock(block);
        });
    };

    render(): JSX.Element {
        return <RootNavigator />;
    }
}

export default connect(mapState, mapDispatch)(Core);
