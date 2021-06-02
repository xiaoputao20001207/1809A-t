import { request } from 'umi';

export const getAll = ()=>{
    return request('/sxpt/blacking/blackList?isAsc=desc&pageNum=1&pageSize=10&type=0&blackingTitle=&classId=')
}

// export const getAll = ()=>{
//     return request('/sxpt/blacking/blackList?isAsc=desc&pageNum=1&pageSize=10&type=0&blackingTitle=&classId=')
// }