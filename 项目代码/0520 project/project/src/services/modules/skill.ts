import { request } from 'umi';
import {ISkillAddItem, ISkillListQuery} from "@/utils/interface"
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
    // 添加岗位
    export let addPostSkill = (data: ISkillAddItem) => {
        return request('/sxpt/station', { 
            method: 'POST',
            // params,  // 表示在url上面传参
            data    // 表示请求体
         })
    }

export let getSkillDetail = (stationVersionId: string)=>{
    return request(`/sxpt/station/selectStationListById/${stationVersionId}`)
}