import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBhMzY4NmIyLWUzZmMtNGU0Ny04NTIyLWJkNzEyMjQzZjA1NCJ9.9TELkNTjXulBARcoDjCdqKYFmuO9enfg7BCLEGpOSAVzuZGLeJTywa_HmuXSc0VTKSZeJVtqGtILBSwQnKY1bA'
export const request: RequestConfig = {
    timeout: 10000,//10秒
    errorConfig: {},
    middlewares: [],
    // 请求拦截器
    requestInterceptors: [(url, options) => {
        //判断
        if(!/http/.test(url)){
            url = baseURL + url;
        }
        console.log('url...',url);

        return {
          url,
          options: { ...options, interceptors: true, headers:{...options.headers,authorization} },
        };
      }],
    // 响应拦截器
    responseInterceptors: [],
};