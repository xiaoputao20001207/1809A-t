<<<<<<< HEAD:项目代码/bw-practical/src/services/modules/skill.ts
import { ISkillListQuery } from '@/utils/interface';
=======
// 接口
import { ISkillAddItem, ISkillListQuery } from '@/utils/interface';
>>>>>>> c857956502441d54ed1f9ef0af04ae629f63b47e:项目代码/gct/实训平台/bw-practice/src/services/modules/skill.ts
import { request } from 'umi';

// 获取专业列表
export let getSkillLabel = ()=>{
    return request('/sxpt/station/selectStationLabel')
}

// 获取选中的岗位列表
<<<<<<< HEAD:项目代码/bw-practical/src/services/modules/skill.ts
export let getSkillList = (params: ISkillListQuery)=>{
    return request('/sxpt/station/selectStationVersionList', { params })
=======
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
>>>>>>> c857956502441d54ed1f9ef0af04ae629f63b47e:项目代码/gct/实训平台/bw-practice/src/services/modules/skill.ts
}