import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { BlocksModel } from 'models';
import { ApiBlocks } from 'api';
import { plainToClass } from 'class-transformer';
import moment from 'moment-timezone';

interface BlocksState {
    blocks: BlocksModel[];
    block: BlocksModel;
}

const blocks = createModel<RootModel>()({
    state: {
        blocks: [],
        block: plainToClass(BlocksModel, null),
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

        addBlock(state, block: BlocksModel) {
            let newBlocks = state.blocks;

            newBlocks.unshift(block);
            newBlocks = [...new Set(newBlocks)];
            newBlocks.sort((a, b) => moment(b.dispatchedAt).date() - moment(a.dispatchedAt).date());

            return {
                ...state,
                blocks: newBlocks,
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

        addBlock(block: BlocksModel) {
            dispatch.blocks.addBlock(block);
        },
    }),
});

export default blocks;
