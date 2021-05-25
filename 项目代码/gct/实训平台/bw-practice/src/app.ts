import React from 'react';
import { RequestConfig } from 'umi';
//引入mobx的provider
import StoreContext from "@/context/storeContext" 
// 引入mobx根实例
import store from '@/store'


const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImYyNTU1Y2I2LWE1MGYtNGVjOS1iYWJhLTEyZmI4MDE1YzhiZSJ9.429MjRkb4h3wiXa8o-36QrFy0KkRYQvbiqxznfaQMrWEFLp8WsxE3mPC6H4qc_hPRw1LkwQL9oyrX_hZWRKO9A'
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

// 注入
export function rootContainer(container:React.ReactElement) {
    //                                                传的值
    return React.createElement(StoreContext.Provider, {value:store}, container);
  }