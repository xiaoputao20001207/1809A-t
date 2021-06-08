import { Addpro, Imohu, ISkilldairnObj } from '@/utils/interface';
import { request } from 'umi';

//获取项目行业接口
export let Gettoplist1 = () => {
  return request('/sxpt/label/selectTradeList');
};
export let Gettoplist2 = () => {
  return request('/sxpt/label/selectMajorStationList');
};
//获取行业点击的每一项接口
export let GetListDairnItem = (params: Imohu) => {
  return request('/sxpt/project/selectProjectList?', { params });
};

//获取行业接口
export let getaddlistone = () => {
  return request('/sxpt/label/selectTradeList');
};
//获取专业接口
export let getaddlistzhuanye = () => {
  return request('/sxpt/label/selectMajorStationList');
};

export let mohu = (params: Imohu) => {
  return request('/sxpt/project/selectProjectList', { params });
};

export let getarr = () => {
  return request('/sxpt/label/selectMajorStationList');
};
//添加项目
export let updatecode = (param: any) => {
  console.log(param);
  return request('/sxpt/project', { method: 'POST', data: param });
};

//删除接口
export let DelItem = (versionId:string) =>{
   return request(`/sxpt/project/deleteProjectByVersionId?projectVersionId=${versionId}`,{
    method:'DELETE',
   })
}

//详情EditorDetail
export let EditorDetail=(versionId:string)=>{
  return request(`/sxpt/project/selectProjectByVserionId?versionId=${versionId}`)
}

//编辑页面实训大纲
export let getTrainingSyllabus = () => {
  return request('/sxpt/brief/selectBriefTree')
}
//实训大纲保存
export let saveTrainingSyllabusList=()=>{
  return request('/sxpt/brief')
}
//编辑页面项目资源
export let getProjectResources = () => {
  return request('/sxpt/projectResource/selectResourceTree')
}
//上传图片
export let getImg = (data: any) => {
  return request('/common/upload', {
      method: 'POST',
      data
  })
}