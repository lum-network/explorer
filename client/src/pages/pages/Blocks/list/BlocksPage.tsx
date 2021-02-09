import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Table } from 'components';
import { BlocksModel } from 'models';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import Pusher from 'pusher-js';

import { NavigationConstants, SocketConstants, SystemConstants } from 'constant';

interface IProps {}

const mapState = (state: RootState) => ({
    blocks: state.blocks.blocks,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchBlocks: () => dispatch.blocks.fetchBlocks(),
    addBlock: (block: BlocksModel) => dispatch.blocks.addBlock(block),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlocksPage extends PureComponent<Props> {
    pusher: Pusher | null = null;

    componentDidMount(): void {
        const { addBlock, fetchBlocks } = this.props;

        fetchBlocks().finally(() => null);

        //TODO: Finish socket implem
        // Maybe: Init the sockets in App core
        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '', {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        });

        const channel = this.pusher.subscribe(SocketConstants.BLOCKS);

        channel.bind(SocketConstants.NEW_BLOCK_EVENT, async (data: BlocksModel) => {
            addBlock(data);
        });
    }

    componentWillUnmount() {
        if (this.pusher) {
            this.pusher.unsubscribe(SocketConstants.BLOCKS);
        }
    }

    renderRow(block: BlocksModel): JSX.Element {
        return (
            <tr key={block.height}>
                <td>
                    <Link to={`${NavigationConstants.BLOCKS}/${block.height}`}>{block.height}</Link>
                </td>
                <td>{`${moment.utc(block.dispatchedAt).fromNow()} (${moment
                    .utc(block.dispatchedAt)
                    .tz(SystemConstants.TIMEZONE)
                    .format('YYYY-MM-DD HH:mm:ss')})`}</td>
                <td>{block.numTxs}</td>
                <td>{block.proposerAddress}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { blocks } = this.props;

        return (
            <Card>
                <h1>Blocks</h1>
                <Table head={['Height', 'Time', 'Transactions', 'Proposer']}>
                    {blocks.map((block) => this.renderRow(block))}
                </Table>
            </Card>
        );
    }
}

export default connect(mapState, mapDispatch)(BlocksPage);
