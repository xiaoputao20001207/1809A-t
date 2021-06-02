import { request } from 'umi';
//面试记录管理页面请求
export let getrankList=()=>{
   return request('/sxpt/classPlan/getClassInfo')
}

export let getRecordRangking=(classId:string)=>{
   return request('/sxpt/interview/interviewRecordRangkingTeacher',{
      params:{
         classId
      }
   })
}
export let getAnswerRecordRangking=(classId:string)=>{
   return request('/sxpt/interview/interviewAnswerRangkingTeacher',{
      params:{
         pageNum:1,
         pageSize:10,
         classId
      }
   })
}