import {request} from 'umi'
import {LoginPerson} from '@/utils/personcenter'

//验证码接口
export const Verificationcode = ()=>{
    return request('/captchaImage')
}

//登录
export const loginPage = (data:LoginPerson)=>{
    return request('/login',{
        method:'POST',
        data
    })
}