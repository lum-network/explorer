import axios from 'axios';
import { ApiConstants } from 'constant';

export const search = (text: string): Promise<{ type: string; data: string }> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.SEARCH_URL}/${text}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                resolve(result.data.result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
