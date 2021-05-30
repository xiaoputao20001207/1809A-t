import { Interviewquery } from '@/utils/interview';
import { request } from 'umi';
//面试记录页面请求
export let getselectStationLabel=()=>{
    return request('/sxpt/station/selectStationLabel')
}

//直接调用接口请求
//面试记录表格数据
//默认为空 返回全部数据
export let getinterviewTableList=(params:Interviewquery)=>{
    return request('/sypt/interview/interviewList',{params})
}

//获取面试者详情
export let getinterviewDetail=(interviewId:string)=>{
    return request(`/sypt/interview/info/${interviewId}`)
}


//面试详情页面 屏蔽 与解除屏蔽
export let detailForget=(interviewId:string,status:number)=>{
    console.log(status)
    return request('sypt/interview/deleteInterview',{
        params:{
            interviewId,
            status
        }
    })
}