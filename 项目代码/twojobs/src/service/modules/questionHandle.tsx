
import {IQuestionHandleQuery} from "@/utils/question"
import { request } from 'umi';

//获取选中的岗位列表
export let getQuestionHandleList=(params:IQuestionHandleQuery)=>{
    return request("/sxpt/answer/all?pageNum=1&pageSize=10&classId=9&searchTitle=",{params})
}