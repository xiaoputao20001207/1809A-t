import { IplanList } from '@/utils/interface';
import { request } from 'umi';

//
export let GetplanList=(queryParams:string)=>{
  return  request('/sxpt/classPlan/getPlanListAll?'+queryParams)
}