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
                block: plainToClass(BlocksModel, null),
            };
        },

        addNewBlock(state, block: BlocksModel) {
            let newBlocks = state.blocks;

            newBlocks.unshift(block);
            newBlocks = [...new Set(newBlocks)];
            newBlocks.sort((a, b) => parseInt(b.height || '0', 10) - parseInt(a.height || '0', 10));

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

                dispatch.blocks.setBlocks(blocks);
            } catch (e) {}
        },

        async getBlock(id: string, state) {
            // We reset "block" only when we request a different block
            if (state.blocks.block && state.blocks.block.height !== id) {
                dispatch.blocks.resetBlock();
            }

            try {
                const block = await ApiBlocks.getBlock(id);

                dispatch.blocks.setBlock(block);
            } catch (e) {}
        },

        addBlock(block: BlocksModel) {
            dispatch.blocks.addNewBlock(block);
        },
    }),
});

export default blocks;
