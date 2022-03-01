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
        block: plainToClass(BlocksModel, null),
    } as BlocksState,
    reducers: {
        SET_BLOCKS(state, blocks: BlocksModel[]) {
            return {
                ...state,
                blocks,
            };
        },

        SET_BLOCK(state, block: BlocksModel) {
            return {
                ...state,
                block,
            };
        },

        RESET_BLOCK(state) {
            return {
                ...state,
                block: plainToClass(BlocksModel, null),
            };
        },

        ADD_NEW_BLOCK(state, block: BlocksModel) {
            let newBlocks = state.blocks;

            newBlocks.unshift(block);
            newBlocks = [...new Set(newBlocks)];
            newBlocks.sort((a, b) => parseInt(b.height || '0', 10) - parseInt(a.height || '0', 10));
            newBlocks.slice(0, 50);

            return {
                ...state,
                blocks: newBlocks,
            };
        },
    },
    effects: (dispatch) => ({
        async fetchBlocks() {
            try {
                const blocks = await ApiBlocks.fetchBlocks();

                dispatch.blocks.SET_BLOCKS(blocks);
            } catch (e) {}
        },

        async getBlock(id: string, state) {
            // We reset "block" only when we request a different block
            if (state.blocks.block && state.blocks.block.height !== id) {
                dispatch.blocks.RESET_BLOCK();
            }

            try {
                const block = await ApiBlocks.getBlock(id);

                dispatch.blocks.SET_BLOCK(block);
            } catch (e) {}
        },

        addBlock(block: BlocksModel) {
            dispatch.blocks.ADD_NEW_BLOCK(block);
        },
    }),
});

export default blocks;
