import React, { PureComponent } from 'react';
import { Button, Card, Table } from 'frontend-elements';
import { BlocksModel } from 'models';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import moment from 'moment-timezone';
import { i18n, StringsUtils } from 'utils';

interface IProps extends RouteComponentProps {
    blocks: BlocksModel[];
    title?: boolean;
    more?: boolean;
}

class BlocksList extends PureComponent<IProps> {
    renderRow(block: BlocksModel, index: number, head: string[]): JSX.Element {
        const { more } = this.props;

        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link to={`${NavigationConstants.BLOCKS}/${block.height}`}>{block.height}</Link>
                </td>
                <td data-label={head[1]} title={block.proposerAddress}>
                    <Link to={`${NavigationConstants.VALIDATORS}/${block.proposerAddress}`}>
                        {StringsUtils.trunc(block.proposerAddress || '', more ? 4 : 8)}
                    </Link>
                </td>
                <td data-label={head[2]} className="text-end">
                    {block.numTxs}
                </td>
                <td data-label={head[3]} className="text-end">
                    <small>{moment.utc(block.dispatchedAt).fromNow()}</small>
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        const { blocks, title, more, history } = this.props;
        const head = [i18n.t('height'), i18n.t('proposer'), i18n.t('transactions'), i18n.t('time')];

        return (
            <Card withoutPadding className="mb-5">
                <div className="d-flex justify-content-between">
                    {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('blocks')}</h3>}
                    {more && (
                        <Button
                            className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3"
                            onPress={() => history.push(NavigationConstants.BLOCKS)}
                        >
                            {i18n.t('viewAll')}
                        </Button>
                    )}
                </div>
                <Table head={head}>{blocks.map((block, index) => this.renderRow(block, index, head))}</Table>
            </Card>
        );
    }
}

export default withRouter(BlocksList);
