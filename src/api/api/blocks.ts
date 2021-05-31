import axios from 'axios';
import { ApiConstants } from 'constant';
import { BlocksModel } from 'models';
import { plainToClass } from 'class-transformer';

export const fetchBlocks = (): Promise<BlocksModel[]> => {
    return new Promise((resolve, reject) => {
        axios(ApiConstants.BLOCKS_URL, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const blocks = plainToClass(BlocksModel, result.data.result) as unknown as BlocksModel[];

                resolve(blocks);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getBlock = (id: string): Promise<BlocksModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.BLOCKS_URL}/${id}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const block = plainToClass(BlocksModel, result.data.result);

                resolve(block);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
