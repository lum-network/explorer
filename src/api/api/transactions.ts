import axios from 'axios';
import { ApiConstants } from 'constant';
import { TransactionsModel } from 'models';
import { plainToClass } from 'class-transformer';

export const fetchTransactions = (): Promise<TransactionsModel[]> => {
    return new Promise((resolve, reject) => {
        axios(ApiConstants.TRANSACTIONS_URL, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const transactions = (plainToClass(
                    TransactionsModel,
                    result.data.result,
                ) as unknown) as TransactionsModel[];

                resolve(transactions);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getTransaction = (id: string): Promise<TransactionsModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.TRANSACTIONS_URL}/${id}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const messages = JSON.parse(result.data.result.msgs);

                messages.map((message: Record<string, string & Record<string, unknown>>) => {
                    message.value.type = message.type;

                    return message;
                });

                result.data.result.msgs = JSON.stringify(messages);

                const transaction = plainToClass(TransactionsModel, result.data.result);

                resolve(transaction);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
