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
export let GetListDairnItem = (queryParams?: Imohu) => {
  return request('/sxpt/project/selectProjectList?', { params:queryParams });
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
