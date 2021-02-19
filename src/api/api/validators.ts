import { ValidatorsModel } from 'models';
import axios from 'axios';
import { ApiConstants } from 'constant';
import { plainToClass } from 'class-transformer';

export const fetchValidators = (): Promise<ValidatorsModel[]> => {
    return new Promise((resolve, reject) => {
        axios(ApiConstants.VALIDATORS_URL, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const validators = (plainToClass(ValidatorsModel, result.data.result) as unknown) as ValidatorsModel[];

                resolve(validators);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getValidator = (id: string): Promise<ValidatorsModel> => {
    return new Promise((resolve, reject) => {
        axios(`${ApiConstants.VALIDATORS_URL}/${id}`, { baseURL: ApiConstants.BASE_URL, method: 'GET' })
            .then((result) => {
                const validator = plainToClass(ValidatorsModel, result.data.result);

                resolve(validator);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
