import React from 'react';
import { RequestConfig } from 'umi';

//引入mobx的provider
import StoreContext from '@/context/storeContext'
//引入mobx的跟实例
import store from '@/store'

const baseURL = 'http://111.203.59.61:8060/dev-api'
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImIzMmU1OGRmLTRjYmMtNDNlYy1hYWM0LWQ0YzBiZDM1NTg1ZSJ9.4awYrlM1qe6klHNFGzVwTGz0rlgWDwj2hyYm5CO6gaNQccd2zrLUk5zvwzWcAAAvIZFHSUPhUzImJkOBQOHjtA'

export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {},
  middlewares: [],
  //请求拦截器
  requestInterceptors: [(url,options)=>{
      if(!/http/.test(url)){
          url = baseURL + url
        }
        console.log(url)
      return {
          url,
          options:{...options,interceptors:true,headers:{...options.headers,authorization}}
      }
  }],
  //响应拦截器
  responseInterceptors: [],
};

export function rootContainer(container:React.ReactElement) {
  return React.createElement(StoreContext.Provider, {value:store}, container);
}