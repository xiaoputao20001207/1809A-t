import { Addpro, ISkilldairnObj } from '@/utils/interface';
import { request } from 'umi';


//获取项目行业接口
export let Gettoplist1=()=>{
    return request('/sxpt/label/selectTradeList')
}

//获取行业点击的每一项接口
export let GetListDairnItem = (queryParams:ISkilldairnObj)=>{
    return request('sxpt/project/selectProjectList',{queryParams})
}
//编辑
export let getIndustryDetail = (versionId:string) => {
    return request(`/sxpt/project/selectProjectByVserionId?versionId=${versionId}`)
}
//编辑页面实训大纲
export let getTrainingSyllabus = () => {
    return request('/sxpt/brief/selectBriefTree')
}
//编辑页面项目资源
export let getProjectResources = () => {
    return request('/sxpt/projectResource/selectResourceTree')
}
//编辑页面前置项目
export let getLeadProject = () => {
    return request('/sxpt/frontPositionProject/selectPushProjectList')
}
//项目页面删除
export let DelIndustry = ( Params : string ) => {
    return request( `/sxpt/project/deleteProjectByVersionId?projectVersionId=${Params}` , {
        method : 'DELETE'
    });
}
//添加项目接口
export let Addproject = (data:Addpro)=>{
    return request('/sxpt/project/',{
        method:'POST',
        data, //表示请求体
    })
}