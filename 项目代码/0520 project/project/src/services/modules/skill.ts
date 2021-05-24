import { request } from 'umi';
import {ISkillListQuery} from "@/utils/interface"
// 获取选中的岗位列表
// export let login = (params: ISkillListQuery)=>{
//     return request('/login', { params })
// }
//专业列表
export let getSkillLabel=()=>{
    return request('/sxpt/station/selectStationLabel')
}

// 获取选中的岗位列表
export let getStationVersionList = (params: ISkillListQuery)=>{
    return request('/sxpt/station/selectStationVersionList', { params })
}