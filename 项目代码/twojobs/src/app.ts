import React from 'react';
import { RequestConfig } from 'umi';

//引入mobx的provider
import StoreContext from '@/context/storeContext'
//引入mobx的跟实例
import store from '@/store'

const baseURL = 'http://111.203.59.61:8060/dev-api'
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjI5OTIyMzhhLWUyZjAtNDZhMC04ZjNhLTQzYjA0Y2Q2OWM5OCJ9.Cbhxg8xB1yL0rX_iTNtlu-vOGKHtt0d4v6kofZQjEC_kxPTPeYV0iBAJorI0MWxfViO4K8N3z5usEfyxhNAkBw'

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