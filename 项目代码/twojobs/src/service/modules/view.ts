import { IPlanDetail, Iview, IViewSortList } from '@/utils/interface'
import {request} from 'umi'

export const getViewList=(params:Iview)=>{
    return request('/sxpt/progress/selectClassPlanInit',{params})
}
export const getViewSortList=(params:Iview)=>{
    return request('/sxpt/progress/classRank',{params})
}
export const getselectClassPlan=()=>{
    return request('/sxpt/progress/selectClassPlan')
}
export const deleteClassPlan=(id:string)=>{
    return request(`/sxpt/classPlan/deleteClassPlan/${id}`)
}