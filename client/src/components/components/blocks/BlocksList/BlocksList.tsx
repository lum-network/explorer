import React, { PureComponent } from 'react';
import { Card, Table } from 'components';
import { BlocksModel } from 'models';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import moment from 'moment-timezone';
import { StringsUtils } from 'utils';

interface IProps {
    blocks: BlocksModel[];
}

class BlocksList extends PureComponent<IProps> {
    renderRow(block: BlocksModel, index: number): JSX.Element {
        return (
            <tr key={index}>
                <td>
                    <Link to={`${NavigationConstants.BLOCKS}/${block.height}`}>{block.height}</Link>
                </td>
                <td title={block.proposerAddress}>{StringsUtils.trunc(block.proposerAddress || '')}</td>
                <td className="text-end">{block.numTxs}</td>
                <td className="text-end">{moment.utc(block.dispatchedAt).fromNow()}</td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { blocks } = this.props;

        return (
            <Card>
                <h3>Blocks</h3>
                <Table head={['Height', 'Proposer', 'Transactions', 'Time']}>
                    {blocks.map((block, index) => this.renderRow(block, index))}
                </Table>
            </Card>
        );
    }
}

export default BlocksList;
