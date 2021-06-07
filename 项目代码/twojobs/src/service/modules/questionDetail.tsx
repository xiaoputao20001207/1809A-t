// 接口

import { request } from 'umi';

import { commitParams,IquestionDetailList} from '@/utils/question';
//问题页面的接口
export let getquestionDetailList=(params:IquestionDetailList)=>{
    return request("/sypt/answer/list",{params:params})
}

export let getprojectlist=()=>{
    return request("/sypt/project/name/list")
}

export let commit=(params:commitParams)=>{
    return request("/sypt/answer",{
        method: 'POST',
        data:params
    })
}
