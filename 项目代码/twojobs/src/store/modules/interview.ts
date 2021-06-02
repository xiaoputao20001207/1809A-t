import {getinterviewTableList, getselectStationLabel} from "@/service"
import {makeAutoObservable} from 'mobx'
import{ ISkillLabel,InterViewListItem, Interviewquery} from "@/utils/interview"

//放置 面试页面的数据以及请求
class Interview{
    constructor(){
        makeAutoObservable(this)
    }
    //专业数据
    skillLabelList:ISkillLabel []= []
    tableList:InterViewListItem []= []
    //请求专业数据的方式
    async getselectStationLabel(){
        let result =await getselectStationLabel()
        if(result.data){
            this.skillLabelList = result.data
        }
    }

}
export default new Interview