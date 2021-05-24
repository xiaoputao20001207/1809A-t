// 接口
import { ISkillListQuery } from '@/utils/interface';
import { request } from 'umi';

// 获取专业列表
export let getSkillLabel=()=>{
    return request('/sxpt/station/selectStationLabel')
}

// 获取选中的岗位列表
export let  getSkillList=( params:ISkillListQuery )=>{
    return request('/sxpt/station/selectStationVersionList',{params})
}