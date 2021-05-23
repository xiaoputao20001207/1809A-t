import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY2YjlkZmEzLTA0NTctNDY1ZS04ZGQyLTAxZTkwODM2NTE4ZSJ9.sCekkbk6mxRD-y05dy3tA0YrDprJvevmTUq8AlUMAi1HB0H_ANG-poq6BPmaoiUbK--2H2J7LnFaE_gm8uzJtQ'
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
