import { request } from 'umi';
import { ISkillAddItem, ISkillListQuery } from '@/utils/interface';

//获取专业接口
export let Gettoplist = () => {
    return request('/sxpt/station/selectStationLabel')
}

//获取专业点击每一项接口
export let GetListItem = (params:ISkillListQuery)=>{
    return request('/sxpt/station/selectStationVersionList',{params})
}

//添加岗位接口
export let Addpostskill = (data:ISkillAddItem)=>{
    return request('/sxpt/station',{
        method:'POST',
        data //表示请求体
    })
}

//获取岗位详情页
export let getSkillDetail = (stationVersionId:string)=>{
    return request(`/sxpt/station/selectStationListById/${stationVersionId}`)
}
