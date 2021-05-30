import React,{} from 'react';
import { IRouteComponentProps, RequestConfig, history } from 'umi';

//引入mobx的provider
import StoreContext from '@/context/storeContext'
//引入mobx的跟实例
import store from '@/store'
import { getCookie } from './utils/auth';

const baseURL = 'http://111.203.59.61:8060/dev-api'
let authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjcwMmEwOGViLTUwYWQtNGFlNC1iYmI0LTExYzFhYjc4NjhkMiJ9.nqzu9Lt8a223igwuWPvIazQoj2dsjVRIaILkVcd3ELieN6I-AhtH1oJzjSmZAs1ssi35UIUygTFEtt66jhf1RA'
// authorization = getCookie() as string

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
  responseInterceptors: [

  ],
};

export function rootContainer(container:React.ReactElement) {
  return React.createElement(StoreContext.Provider, {value:store}, container);
}

//导航守卫
// const whiteArr = ['/login','403','404']
// export function onRouteChange({ matchedRoutes }:any) {
//   if (matchedRoutes.length) {
//     document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   }
//   if(!authorization && whiteArr.indexOf(location.pathname)===-1){
//       history.replace(`/login?redirect=${encodeURIComponent(location.pathname)}`)
//   }
// }