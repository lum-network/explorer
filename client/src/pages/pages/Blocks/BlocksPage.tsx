import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';

interface IProps {}

const mapState = (state: RootState) => ({
    blocks: state.blocks,
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchBlocks: () => dispatch.blocks.fetchBlocks(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class BlocksPage extends PureComponent<Props> {
    async componentDidMount(): Promise<void> {
        const { fetchBlocks } = this.props;

        await fetchBlocks();

        console.log(this.props.blocks);
    }

    render(): JSX.Element {
        return <div>Blocks!</div>;
    }
}

export default connect(mapState, mapDispatch)(BlocksPage);
