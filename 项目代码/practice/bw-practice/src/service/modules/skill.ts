import { request } from 'umi'
import { ISkillListQuery } from '@/utils/interface';
//获取专业列表
export const getSkillLable=()=>{
    return request('/sxpt/station/selectStationLabel')
}

// 获取选中的岗位列表
export const getSkillList = (params: ISkillListQuery)=>{
    return request('/sxpt/station/selectStationVersionList', { params })
}

//登录接口
export const Login=()=>{
    
}