
import { request } from 'umi';
// 状态接口
import { commitParams,questionDetailList} from '@/utils/question';

export let getquestionDetailList=(params:questionDetailList)=>{
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