import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImViZmFmNmU0LWE1YzQtNGNlNi1hZmE2LWJhMjAyZTM2MzkyOCJ9.zTO8nonjY-gRaYjGSZkOavAFA-6ViYceB5x66Jj3Yp5xgzDGOwyoLA4SugKIZ-YPQ9HkU9V7qb9Vplbw9LsxFQ';
export const request: RequestConfig = {
    timeout: 10000,
    errorConfig: {},
    middlewares: [],
    //请求拦截体,
    requestInterceptors: [(url, options) => {
        if(!/http/.test(url)) {
            url = baseURL + url;
        }
        return {
            url,
            options: { ...options, interceptors: true, headers: { ...options.headers, authorization } }
        }
    }],
    //响应拦截体
    responseInterceptors: [],
};
