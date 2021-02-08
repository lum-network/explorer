import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import BlocksModel from 'models/models/blocks';
import { ApiBlocks } from '../../../api';

interface BlocksState {
    blocks: BlocksModel[];
}

const blocks = createModel<RootModel>()({
    state: {
        blocks: [],
    } as BlocksState,
    reducers: {
        setBlocks(state, blocks: BlocksModel[]) {
            return {
                ...state,
                blocks,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchBlocks() {
            const blocks = await ApiBlocks.fetchBlocks();

            dispatch.blocks.setBlocks(blocks);
        },
    }),
});

export default blocks;
