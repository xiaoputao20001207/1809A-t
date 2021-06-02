import { request } from 'umi';
import { questionDetailList } from '@/utils/interface';
export let getquestionDetailList=(params:questionDetailList)=>{
   
    
    return request("/sypt/answer/list",{params:params})
}

