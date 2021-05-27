import { IPlanListItem } from '@/utils/interface'
import {request} from 'umi'

export const getPlanList=(params:IPlanListItem)=>{
    return request('/classPlan/getPlanList',{params})
}