import React from 'react';
import { IRouteComponentProps, RequestConfig ,history} from 'umi';

//引入mobx的provider
import StoreContext from '@/context/storeContext'
//引入mobx的跟实例
import store from '@/store'
import { getCookie } from './utils/user';

const baseURL = 'http://111.203.59.61:8060/dev-api'
// const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImFiY2JiZmQwLWMyZTItNGIxYi1hMjU0LTdiNmVjNTY1MTZmMyJ9.Ig0Wwhe67YZDpKIK27qF8NoEHOoPgAYOjfg9Zw8uKtNMqFI9QlwGdCADfFYuD-l_to4QCJS6WDz_mCjJzUvhsw'

let authorization = getCookie()

export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {},
  middlewares: [],

  //请求拦截器
  requestInterceptors: [(url,options)=>{

      if(!/http/.test(url)){
          url = baseURL + url
        }
      
      //判断
      let headers = options.headers
      if(authorization){
        headers= {...headers,authorization}
      }

      return {
          url,
          options:{...options,interceptors:true,headers}
      }
  }],
  //响应拦截器
  responseInterceptors: [],
};

export function rootContainer(container:React.ReactElement) {
  return React.createElement(StoreContext.Provider, {value:store}, container);
}

//导航守卫
const whiteList= ['/login','/403','/404']

export function onRouteChange({location,matchedRoutes}:IRouteComponentProps & any){
  if(matchedRoutes.length){
    document.title = matchedRoutes[matchedRoutes.length-1].route.title || ''
  }
  if(!authorization){
    if(whiteList.indexOf(location.pathname)== -1){
      history.replace(`/login?redirect=${encodeURIComponent(location.pathname)}`)
    }
  }
}