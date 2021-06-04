import { getClassStudent } from '@/service'
import { IAddPlanList } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'
// function addFlag(arr:IAddPlanList[]){
//     arr.forEach(item=>{
//         item.flag=false
//     })
//     return arr
// }


class addPlan {
    constructor(){
        makeAutoObservable(this)
    }
    num=0
    islook:boolean=false
    list:string[]=[]
    newaddPlanList:IAddPlanList[]=[]
    addPlanList:IAddPlanList[]=[]
    checkAll:boolean=false
    isMove:boolean=false
    dist:string=''
    async getClassStudent(){
        const result =await getClassStudent()
        if(result.data){
            const addPlanList=result.data.map((item:IAddPlanList)=>{
                return {...item,flag:this.checkAll,isMove:this.isMove,dist:this.dist,avatar:'http://111.203.59.61:8060'+item.avatar}
            })
            this.addPlanList=addPlanList
        }
        // console.log('this.addPlanList',this.addPlanList)
    }
}
export default new addPlan
