// 接口
import { ISkillAddItem, ISkillListQuery } from '@/utils/interface';
import { request } from 'umi';

// 获取专业列表
export let getSkillLabel=()=>{
    return request('/sxpt/station/selectStationLabel')
}

// 获取选中的岗位列表
export let  getSkillList=( params:ISkillListQuery )=>{
    return request('/sxpt/station/selectStationVersionList',{params})
}

// 添加岗位
export let addPostSkill =(data:ISkillAddItem)=>{
    return request('/sxpt/station',{
        method:"POST",
        data //表示请求体
        // params, //表示在url上面传参数
        
    })
}

// 获取岗位详情
export let getSkillDetail =(stationVersionId:string)=>{
    return request(`/sxpt/station/selectStatinListById/${stationVersionId}`)
}