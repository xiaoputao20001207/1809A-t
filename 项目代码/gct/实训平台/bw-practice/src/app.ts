import React from 'react';
import { RequestConfig } from 'umi';
//引入mobx的provider
import StoreContext from "@/context/storeContext" 
// 引入mobx根实例
import store from '@/store'


const baseURL = 'http://111.203.59.61:8060/dev-api';
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQyZWIwN2Y0LTQ0YmUtNDE5Zi1hYzQ3LTQwYjE2MzgxYjIyOCJ9.1i3gsJFXgZ4FFI69pb8ai49rAoMsi5kI4hopyh2fvrIWxtNmzgRqn5Di8ou0kIhGeXr9WncKHmzXPJGf-6I0fA'
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