import { Addpro, ISkilldairnObj } from '@/utils/interface';
import { request } from 'umi';


//获取项目行业接口
export let Gettoplist1=()=>{
    return request('/sxpt/label/selectTradeList')
}

// export let Gettoplist2 = () => {
//     return request('/sxpt/label/selectMajorStationList')
// }

//获取行业点击的每一项接口
export let GetListDairnItem = (params:ISkilldairnObj)=>{
    return request('sxpt/project/selectProjectList',{params})
}

//添加项目接口
export let Addproject = (data:Addpro)=>{
    return request('/sxpt/project',{
        method:'POST',
        data //表示请求体
    })
}