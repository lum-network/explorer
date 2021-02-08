import axios from 'axios';
import { ApiConstants } from 'constant';
import BlocksModel from 'models/models/blocks';
import { plainToClass } from 'class-transformer';

export const fetchBlocks = (): Promise<BlocksModel[]> => {
    return new Promise((resolve, reject) => {
        axios('blocks', { baseURL: ApiConstants.BASE_URL })
            .then((result) => {
                const blocks = (plainToClass(BlocksModel, result.data.result) as unknown) as BlocksModel[];

                resolve(blocks);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
