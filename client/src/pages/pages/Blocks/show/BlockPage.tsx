import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { Card } from '../../../../components';
import moment from 'moment';

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

    renderLoading(): JSX.Element {
        return (
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    renderContent(): JSX.Element {
        const { block } = this.props;

        return (
            <Card>
                <h1>Block details</h1>
                <div>Height: {block.height}</div>
                <div>
                    Date:{' '}
                    {`${moment(block.dispatchedAt).fromNow()} (${moment(block.dispatchedAt).format(
                        'YYYY-MM-DD HH:mm:ss',
                    )})`}
                </div>
                <div>Transactions: {block.numTxs}</div>
                <div>Proposer: {block.proposerAddress}</div>
            </Card>
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
