import type { ApiErrorResponse } from '../../types/api';

type RequestOptions = Record<string, string | number>;
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

type ApiOkResponse = { status: 'ok' };
type ApiResponse = ApiOkResponse | ApiErrorResponse;

class Loader {
    baseLink: string;
    options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    /**
     * Успешный ответ передаётся в callback; error-ответ бросается в catch.
     * T — полный тип ответа NewsAPI (union ok|error), чтобы вызывающий код
     * мог указать SourcesResponse / ArticlesResponse из api.ts.
     */
    getResp<T extends ApiResponse>(
        { endpoint, options = {} }: { endpoint: string; options?: RequestOptions },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T extends ApiResponse>(
        method: HttpMethod,
        endpoint: string,
        callback: (data: T) => void,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<ApiResponse>)
            .then((data) => {
                if (data.status === 'error') {
                    const { code, message } = data;
                    throw new Error(`NewsAPI error [${code}]: ${message}`);
                }
                callback(data as T);
            })
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
