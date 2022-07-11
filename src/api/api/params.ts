import axios from "axios";
import { plainToClass } from "class-transformer";
import { ApiConstants } from "constant";
import { ParamsModel } from "models";

export const getParams = (): Promise<ParamsModel> => {
    return new Promise((resolve, reject) => {
        axios.get(ApiConstants.PARAMETERS_URL, { baseURL: ApiConstants.BASE_URL }).then((result) => {
            const params = plainToClass(ParamsModel, result.data.result);

            resolve(params);
        }).catch((error) => {
            reject(error);
        });
    });
};