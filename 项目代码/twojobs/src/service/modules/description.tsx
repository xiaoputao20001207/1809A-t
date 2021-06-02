import { IStationSkillDetail } from '@/utils/interface';
import { request } from 'umi';


//脚部添加第一层接口
export let initSkill = (stationVersionId:string, parentId='0' as string) => {
    return request('/sxpt/skill/inintSkill',{
        method:'POST',
        data:{
            stationVersionId, parentId
        }
    })
}

//脚部添加第二层和每一层
export let addSubmitItem = (stationVersionId:string,parentId:string)=>{
    return request('/sxpt/skill/inintSkill',{
        method:'POST',
        data:{
            stationVersionId, parentId
        }
    })
}

//删除接口
export let delSubmitItem = (skillId:string)=>{
    return request('/sxpt/skill/deleteSkill',{
        method:'DELETE',
        params:{
            skillId
        }
    })
}

// 获取当前技能详情
export let getStationSkillDetail = (skillId: string)=>{
    return request(`sxpt/skill/selectSkillInfo/${skillId}`)
}


// 修改技能要求
export let changeValueItem = (data: IStationSkillDetail)=>{
    return request('sxpt/skill', {
        method: 'POST',
        data
    })
}
