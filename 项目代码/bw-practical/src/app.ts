import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBlMDY5NDdiLWI4NGQtNDRkNy1iOTNjLTRkMDExMTQwYWI1OCJ9.qTeecl5bC2dMnuc6n8cKkJzNbZ7diAvYP1MHEsR06IcjiJYgMJPQfANdsZHAawFk8UOYFM0YTGxpA7J-_6CUNA';
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {},
  middlewares: [],
  // 请求拦截器
  requestInterceptors: [(url, options) => {
    if (!/http/.test(url)){
        url = baseURL + url;
    }
    return {
      url,
      options: { ...options, interceptors: true , headers:{...options.headers, authorization}},
    };
  }],
  // 相应拦截器
  responseInterceptors: [],
};