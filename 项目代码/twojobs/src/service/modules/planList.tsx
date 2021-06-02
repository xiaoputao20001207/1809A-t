import { IPlanListItem, IPlanStatus } from '@/utils/interface'
import {request} from 'umi'

export const getPlanList=(params:IPlanStatus)=>{
    return request('/sxpt/classPlan/getPlanList',{params})
}