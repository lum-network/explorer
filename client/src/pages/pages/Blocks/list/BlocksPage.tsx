import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card, Table } from 'components';
import { BlocksModel } from 'models';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import { NavigationConstants, SystemConstants } from 'constant';

interface IProps {}

const mapState = (state: RootState) => ({
    blocks: state.blocks.blocks,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchBlocks: () => dispatch.blocks.fetchBlocks(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlocksPage extends PureComponent<Props> {
    componentDidMount(): void {
        const { fetchBlocks } = this.props;

        fetchBlocks().finally(() => null);
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
