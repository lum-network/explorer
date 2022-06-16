import { createModel } from '@rematch/core';
import { RootModel } from '../index';
import { BlocksModel, MetadataModel } from 'models';
import { plainToClass } from 'class-transformer';
import Api from 'api';

interface BlocksState {
    blocks: BlocksModel[];
    metadata?: MetadataModel;
    block: BlocksModel;
}

const blocks = createModel<RootModel>()({
    state: {
        blocks: [],
        block: plainToClass(BlocksModel, null),
    } as BlocksState,
    reducers: {
        SET_BLOCKS(state, blocks: BlocksModel[], metadata: MetadataModel) {
            return {
                ...state,
                blocks,
                metadata,
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
        async fetchBlocks(page?: number) {
            try {
                const [blocks, metadata] = await Api.fetchBlocks(page);

                dispatch.blocks.SET_BLOCKS(blocks, metadata);
            } catch (e) {}
        },

        async getBlock(id: string, state) {
            // We reset "block" only when we request a different block
            if (state.blocks.block && state.blocks.block.height !== id) {
                dispatch.blocks.RESET_BLOCK();
            }

            try {
                const [block] = await Api.getBlock(id);

                dispatch.blocks.SET_BLOCK(block);
            } catch (e) {}
        },

        addBlock(block: BlocksModel) {
            console.log(block);
            // FIXME
            // dispatch.blocks.ADD_NEW_BLOCK(block);
        },
    }),
});

export default blocks;
