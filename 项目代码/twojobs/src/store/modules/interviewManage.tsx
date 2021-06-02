import {makeAutoObservable} from 'mobx'
import { InterviewManageList, InterviewManageQuery } from '@/utils/interview';
import {interviewManage} from "@/service"

//放置 面试记录管理的数据以及请求
class InterviewManage{
    constructor(){
        makeAutoObservable(this)
    }
    //面试管理数据
    interviewManageList:InterviewManageList [] = [];

    //携带参数请求
    async getinterviewManage(params:InterviewManageQuery){
        let result = await interviewManage(params)
        this.interviewManageList = result.rows
    }
    
}
export default new InterviewManage