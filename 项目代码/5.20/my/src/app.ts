import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api'
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjFmZWNkNzJiLWFkM2QtNGRmZC05YjI5LTNmNGQ0ZTRjMTMyOCJ9.B4Ig_E_v2I6QowYrjhAG_K9I7pYEx0gRpot_Hlc99Hk_xhW-AU9idQHJBBfYHpFRQBhISPLQIZE78T-4p6JFCQ'

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