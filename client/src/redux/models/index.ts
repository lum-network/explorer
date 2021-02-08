import { Models } from '@rematch/core';
import blocks from './models/blocks';

export interface RootModel extends Models<RootModel> {
    blocks: typeof blocks;
}

const models: RootModel = {
    blocks,
};

export default models;
