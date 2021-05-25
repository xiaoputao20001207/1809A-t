import { RequestConfig } from 'umi';
import React from 'react';
import StoreContext from "@/context/storeContext"
import store from "@/store"//引入 store
import Provider from './.umi/plugin-model/Provider';

const baseURL = 'http://111.203.59.61:8060/dev-api';
<<<<<<< HEAD:项目代码/bw-practical/src/app.ts
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBlMDY5NDdiLWI4NGQtNDRkNy1iOTNjLTRkMDExMTQwYWI1OCJ9.qTeecl5bC2dMnuc6n8cKkJzNbZ7diAvYP1MHEsR06IcjiJYgMJPQfANdsZHAawFk8UOYFM0YTGxpA7J-_6CUNA';
=======
const authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY0YTRhMTE0LTQ1M2ItNGRmMi04ZDdiLTE4OTc3YWU4Njk5YyJ9.xlMter0IAiVX68wNgLLUr3D6yL6vUJL8T1iZvGZQ_tqOpmjn0m7r4mzPYSBvaki9vnKEFmr58BEe7SA2aZxdLw'
>>>>>>> 257a78a4e31caa7dca33f59fbd43a0c078bfccd4:项目代码/0520 project/project/src/app.ts
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
<<<<<<< HEAD:项目代码/bw-practical/src/app.ts
};
=======
};

export function rootContainer(container:React.ReactElement) {
  return React.createElement(StoreContext.Provider,{value:store}, container);
}
>>>>>>> 257a78a4e31caa7dca33f59fbd43a0c078bfccd4:项目代码/0520 project/project/src/app.ts
