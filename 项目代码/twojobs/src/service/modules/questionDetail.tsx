import { request } from "@/.umi/plugin-request/request"


// 获取问答类型接口
export let Gettypelist = () =>{
    return request('/sxpt/blacking/blackList')
}

// 问答页面列表接口
export let GettypeItem = () =>{
    return request('/sypt/answer/list')
}


// 待处理问答 状态接口
export let GetState = () =>{
    return request('/sxpt/blacking/blackList')
}