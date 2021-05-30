import {request} from 'umi'

//验证码接口
export const Verificationcode = ()=>{
    return request('/captchaImage')
}

//登录
export const loginPage = (value:any)=>{
    return request('/login',{
        method:'POST',
        data:value
    })
}