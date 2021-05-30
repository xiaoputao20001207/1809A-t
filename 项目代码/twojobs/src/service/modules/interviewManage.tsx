import { InterviewManageList, InterviewManageQuery } from '@/utils/interview';
import { request } from 'umi';
//面试记录管理页面请求  包括搜索
export let interviewManage=(params:InterviewManageQuery)=>{
    return request('/sypt/interview/interviewManage',{params})
}