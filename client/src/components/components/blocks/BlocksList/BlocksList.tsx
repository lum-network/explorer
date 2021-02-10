import React, { PureComponent } from 'react';
import { Card, Table } from 'components';
import { BlocksModel } from 'models';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import moment from 'moment-timezone';
import { Strings } from 'utils';

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
                <td title={block.proposerAddress}>{Strings.trunc(block.proposerAddress || '')}</td>
                <td>{block.numTxs}</td>
                <td>{moment.utc(block.dispatchedAt).fromNow()}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { blocks } = this.props;

        return (
            <Card>
                <h1>Blocks</h1>
                <Table head={['Height', 'Proposer', 'Transactions', 'Time']}>
                    {blocks.map((block) => this.renderRow(block))}
                </Table>
            </Card>
        );
    }
}

export default BlocksList;
