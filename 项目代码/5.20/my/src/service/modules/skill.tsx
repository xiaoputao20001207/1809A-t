import { request } from 'umi';
import { ISkillListQuery } from '@/utils/interface';

//获取专业接口
export let Gettoplist = () => {
    return request('/sxpt/station/selectStationLabel')
}

//获取专业点击每一项接口
export let GetListItem = (params:ISkillListQuery)=>{
    return request('/sxpt/station/selectStationVersionList',{params})
}
