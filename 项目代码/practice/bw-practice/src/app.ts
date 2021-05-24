import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE1MjMyZGJlLWFjNTctNDM3NS05NDQzLTQyMzlhYmJmN2FlYiJ9.7ETa5UAW0_cJNpJvF3am584lP8_0AsdJtw-MjmEVxslDrOXAXOs_QELKdgO1CZ2XqG4wOfZ2Lb3NJaGKqBIIPw';
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
