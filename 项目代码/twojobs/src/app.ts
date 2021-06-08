import React from 'react'
import { IRouteComponentProps, RequestConfig, history } from 'umi';
import {message, Modal,notification} from 'antd'
//引入mobx的provider
import StoreContext from '@/context/storeContext'
//引入mobx的跟实例
import store from '@/store'
import { getCookie } from './utils/auth';
import { SmileOutlined } from '@ant-design/icons';

let isModal = false//控制只弹框一次

const baseURL = 'http://111.203.59.61:8060/dev-api'

export const request: RequestConfig = {
  timeout: 100000,
  errorConfig: {},
  middlewares: [],
  //请求拦截器
  requestInterceptors: [(url,options)=>{
    //获取登录态
    let authorization = getCookie() as string
    // 正则校验
      if(!/http/.test(url)){
          url = baseURL + url
        }

        let headers =  options.headers;
        if(authorization){
          headers = {...headers,authorization}
        }

      return {
          url,
          options:{...options,interceptors:true,headers}
      }
  }],
  //响应拦截器
  responseInterceptors: [async (response,options) => {
    console.log(response,options,location)
    // console.log(response,options)
    let data = {code:200,msg:''};

    try{
      data = await response.clone().json();
      //处理网络错误
      if(response.status !== 200){
           message.error(response.statusText)
           return response
      }

      //处理业务错误
      if(data.code === 401){
        if(isModal){
          return response
        }
        isModal = true
        message.error(data.msg);
        Modal.warning({
          content:'登录态已过期，请重新登陆',
          title:'系统提示',
          okText:'重新登陆',
          closable:true,
          cancelText:'取消',
          onOk:()=>{
            history.replace('/login')
            isModal = false
          }
        })
      }else if(data.code !== 200){
        message.error(data.msg)
        return response
      }
    }catch(e){
      message.error(e.messsage)
      return response
    }

    
  //登录时间提醒
  if(window.location.pathname=='/login'){
    localStorage.clear()
  }else{
    let endtime = + new Date()
    let starttime =JSON.parse( localStorage.getItem('starttime') as string)
    let result = endtime-starttime
    let minute = Math.ceil(result/1000/60)
    //判断在线时长 超过两个小时 弹出提示
    if(result>1000*60*60*2){
      notification.open({
        message: `在线时长${minute}分`,
        description:
          '已经工作很久啦休息一下吧~~',
      });
      //关闭提示后 清空之前存储的时间 重新存储
      localStorage.setItem('starttime',JSON.stringify(+ new Date()))

    }
  }
    
    return response;
  }],
};
// 覆盖根组件，把mobx的store注入
export function rootContainer(container:React.ReactElement) {
  return React.createElement(StoreContext.Provider, {value:store}, container);
}



//导航守卫
const whiteArr = ['/login','403','404']
export function onRouteChange({ matchedRoutes }:any) {

  let authorization = getCookie() as string

  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
  //登录态的拦截
  if(!authorization && whiteArr.indexOf(location.pathname)===-1){
    
      history.replace(`/login?redirect=${encodeURIComponent(location.pathname)}`)
  }
  //重定向
  if(location.pathname === '/'){
    history.replace('/login')
  }
  
}