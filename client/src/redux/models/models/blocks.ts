import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { BlocksModel } from 'models';
import { ApiBlocks } from 'api';
import { plainToClass } from 'class-transformer';

interface BlocksState {
    blocks: BlocksModel[];
    block: BlocksModel;
}

const blocks = createModel<RootModel>()({
    state: {
        blocks: [],
        block: plainToClass(BlocksModel, {}),
    } as BlocksState,
    reducers: {
        setBlocks(state, blocks: BlocksModel[]) {
            return {
                ...state,
                blocks,
            };
        },

        setBlock(state, block: BlocksModel) {
            return {
                ...state,
                block,
            };
        },

        resetBlock(state) {
            return {
                ...state,
                block: plainToClass(BlocksModel, {}),
            };
        },
    },
    effects: (dispatch) => ({
        async fetchBlocks() {
            const blocks = await ApiBlocks.fetchBlocks();

            dispatch.blocks.setBlocks(blocks);
        },

        async getBlock(id: string, state) {
            // We reset "block" only when we request a different block
            if (state.blocks.block.height !== id) {
                dispatch.blocks.resetBlock();
            }

            const block = await ApiBlocks.getBlock(id);

            dispatch.blocks.setBlock(block);
        },
    }),
});

export default blocks;
