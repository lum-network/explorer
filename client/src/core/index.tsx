import React, { PureComponent } from 'react';
import RootNavigator from 'navigation';
import { connect } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { Times } from 'utils';

interface IProps {}

const mapState = (state: RootState) => ({
    loading: state.loading.global,
    blocks: state.blocks.blocks,
    transactions: state.transactions.transactions,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchBlocks: () => dispatch.blocks.fetchBlocks(),
    fetchTransactions: () => dispatch.transactions.fetchTransactions(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class Core extends PureComponent<Props> {
    interval: NodeJS.Timeout | null = null;

    componentDidMount(): void {
        this.fetch();
        this.interval = setInterval(() => {
            this.fetch();
        }, Times.INTERVAL_IN_MS);
    }

    componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    fetch = () => {
        const { fetchBlocks, fetchTransactions } = this.props;

        fetchBlocks().finally(() => null);
        fetchTransactions().finally(() => null);
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
