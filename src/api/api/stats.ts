import { StatsModel } from 'models';
import axios from 'axios';
import { ApiConstants } from 'constant';
import { plainToClass } from 'class-transformer';

export const getStats = (): Promise<StatsModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.STATS_URL}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const stats = plainToClass(StatsModel, result.data.result);

                resolve(stats);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
