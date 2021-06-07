import { LoginParams } from "@/utils/interface"
import { request } from "umi"

//请求验证码
export let getCaptureImage=()=>{
    return  request('/captchaImage')
}

export let goLogin=(data:LoginParams)=>{
    return  request('/login',{
        method:'POST',
        data
    })
}