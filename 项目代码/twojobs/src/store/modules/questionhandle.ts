import {getQuestionHandleList, questionHandleData} from "@/service/index"
import { IQuestionHandleQuery } from "@/utils/question"
import {makeAutoObservable} from "mobx"
// import {  ISkillLabel ,IinterviewManageTableItem} from "@/utils/interface"

class QuestionHandle{
    constructor(){
        makeAutoObservable(this)
    }
    QuestionHandleData=[]

    //定义仓库中的属性
    QuestionHandleList=[]

    async questionHandleData(){
        let result = await questionHandleData()
        if(result.row){
            this.QuestionHandleData=result.row
        }
    }
    //定义仓库中的方法
    async getQuestionHandleList(params:IQuestionHandleQuery){
        let result =await getQuestionHandleList(params)
        // console.log(result,'redult');
        
        if(result.data){
            this.QuestionHandleList=result.data
        }
    }
}

export default new QuestionHandle 