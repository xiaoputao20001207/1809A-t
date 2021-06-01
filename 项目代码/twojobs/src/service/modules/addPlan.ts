import {request} from 'umi'

export const getClassStudent=()=>{
    return request('/sxpt/classPlan/getClassStudent/9')
}