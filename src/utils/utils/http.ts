import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { MetadataModel } from 'models';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {
        data: T;
    }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    protected constructor(baseURL: string) {
        this.instance = axios.create({ baseURL });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use((res) => this.handleResponse(res), this.handleError);
    };

    private handleResponse = ({ data }: AxiosResponse) => data;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    private handleError = (error: any): Promise<any> => Promise.reject(error);

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    protected request = async <T>(config: AxiosRequestConfig, Model: any): Promise<[T, MetadataModel]> => {
        const response = await this.instance.request(config);

        return [plainToClass(Model, response.result) as unknown as T, plainToClass(MetadataModel, response.metadata)];
    };
}

export default HttpClient;
