import { AccountModel } from 'models';
import axios from 'axios';
import { ApiConstants } from 'constant';
import { plainToClass } from 'class-transformer';

export const getAccount = (id: string): Promise<AccountModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.ACCOUNTS_URL}/${id}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                console.log(result.data.result);

                const account = plainToClass(AccountModel, result.data.result);

                resolve(account);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
