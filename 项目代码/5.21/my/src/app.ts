import { RequestConfig } from 'umi';

const baseURL = 'http://111.203.59.61:8060/dev-api'
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBlZTQzYWVjLWFiMmEtNDdhMC05MGZkLWZmMjEzNTNmMDI4OSJ9.x1sAfqPeRTScFDQFincTq-og6zsCOz5x7y8m3Ljm8qjV267xyGjWDAvlBmIuxyXkBHnfY1yNDXT0RdQsCO91bw'

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