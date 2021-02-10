import React, { PureComponent } from 'react';
import { Card, Table } from 'components';
import { BlocksModel } from 'models';
import { Link } from 'react-router-dom';
import { NavigationConstants, SystemConstants } from 'constant';
import moment from 'moment-timezone';

interface IProps {
    blocks: BlocksModel[];
}

class BlocksList extends PureComponent<IProps> {
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

export default BlocksList;
