import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';

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

    private handleResponse = ({ data }: AxiosResponse) => data.result;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    private handleError = (error: any): Promise<any> => Promise.reject(error);

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    protected request = async <T>(config: AxiosRequestConfig, Model: any): Promise<T> => {
        const response = await this.instance.request<T>(config);

        return plainToClass(Model, response) as unknown as T;
    };
}

export default HttpClient;
