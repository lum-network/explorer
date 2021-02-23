import React, { PureComponent } from 'react';
import { Dispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';
import { BlocksList } from 'components';
import blockLogo from 'assets/images/blockDark.svg';
import { i18n } from 'utils';

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

    render(): JSX.Element | null {
        const { blocks } = this.props;

        if (!blocks) {
            return null;
        }

        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={blockLogo} /> {i18n.t('blocks')}
                </h2>
                <BlocksList blocks={blocks} />
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(BlocksPage);
