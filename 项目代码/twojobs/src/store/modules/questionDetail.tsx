import { Gettypelist } from "@/service/modules/questionDetail";
import { makeAutoObservable } from "mobx";

class QuestionDetail{
    constructor(){
        makeAutoObservable(this)
    }
    // 定义属性
    // typelist:
    async Gettypelist(){
        let result = await Gettypelist();
        console.log(result.data);
        
        // if(result.data){
        //     this.typelist=result.data
        // }
    }


}


export default new QuestionDetail;