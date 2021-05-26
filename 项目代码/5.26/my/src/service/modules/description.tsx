import { request } from 'umi';
import { } from '@/utils/interface';

//脚部第一层接口
export let initSkill = (stationVersionId:string, parentId='0' as string) => {
    return request('/sxpt/skill/inintSkill',{
        method:'POST',
        data:{
            stationVersionId, parentId
        }
    })
}
