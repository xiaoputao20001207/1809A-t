
import { request } from 'umi';
// 状态接口
import { questionDetailList } from '@/utils/interface';
export let getquestionDetailList=(params:questionDetailList)=>{
    return request("/sypt/answer/list",{params:params})
}

export let getprojectlist=()=>{
    return request("/sypt/project/name/list")
}